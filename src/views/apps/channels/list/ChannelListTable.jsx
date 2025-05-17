
'use client'

// React Imports
import { useEffect, useState, useMemo } from 'react'

// Next Imports
import Link from 'next/link'

import { useParams } from 'next/navigation'

import { useSession } from 'next-auth/react'

import { toast } from 'react-toastify'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import { styled } from '@mui/material/styles'

// Third-party Imports
import classnames from 'classnames'
import { rankItem } from '@tanstack/match-sorter-utils'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'

// Util Imports
import { getLocalizedUrl } from '@/utils/i18n'

// Style Imports
import tableStyles from '@core/styles/table.module.css'

// Styled Components
const Icon = styled('i')({})

// Fuzzy filter for global filtering
const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  
  addMeta({ itemRank })
  
  return itemRank.passed
}

// Debounced input for filtering
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => setValue(initialValue), [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => onChange(value), debounce)
    

    return () => clearTimeout(timeout)
  }, [value])

  return <TextField {...props} value={value} onChange={e => setValue(e.target.value)} size='small' />
}

// Column helper
const columnHelper = createColumnHelper()

// Async helper to enable channel via API
async function enableChannel(assistantId, channelName, channelId, credentials) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/assistants/${assistantId}/channels/${channelName}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${credentials}`,
        },
        body: JSON.stringify({ channelInfo: { phoneNumberId: channelId } }),
      }
    )
   
   
    if (response.status === 201) {
      const data = await response.json()
      

      return data
    } else {
      const data = await response.json().catch(() => null)
     
      const errorMessage = data?.error?.message || 'Failed to enable channel'
      
      throw new Error(errorMessage)
   
    }
  
  } catch (error) {
    console.error('Error enabling channel:', error)
    throw error
  }
}

async function deleteChannel(assistantId, channelName, channelId, credentials) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/assistants/${assistantId}/channels/${channelName}/${channelId}`,
    {
      method: 'DELETE',                                    // DELETE HTTP method to remove resource :contentReference[oaicite:0]{index=0}
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials}`,            // use same credentials header as enableChannel :contentReference[oaicite:1]{index=1}
      },
    }
  )

  if (!res.ok) {

    const err = await res.json().catch(() => null)

    throw new Error(err?.error?.message || 'Failed to delete channel')
  }
  
  return res.json()
}

async function getActiveAssistantId(credentials) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/activeAssistant`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credentials}`,
      },
    }
  )
  
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    
    throw new Error(err?.error?.message || 'Failed to fetch active assistant')
  }
  
  const data = await res.json()
  
  return data.data.assistantId
}

const ChannelListTable = ({ tableData ,session }) => {

  const [data, setData] = useState([...tableData])
  const [filteredData, setFilteredData] = useState(data)
  const [globalFilter, setGlobalFilter] = useState('')
  const { lang: locale } = useParams()
  const [rowSelection, setRowSelection] = useState({})

  // Handle toggle switch change
  const handleEnabledChange = async (channelId_Text) => {
   
  
    const rowToUpdate = data.find(row => row.channelId_Text === channelId_Text)
    
    if (!rowToUpdate) return
    
    if (!session?.user?.id || !session?.user?.businessId) {
      toast.error('Session is missing. Please log in again.')
      
      return
    }
    
    const credentials = btoa(`${session?.user?.id}@${session?.user?.businessId}`)
    const assistantId =  await getActiveAssistantId(credentials)
    
  
    const newIsEnabled = !rowToUpdate.isEnabled // We want to toggle the value
  
    if (newIsEnabled) {
      // 🟢 Enable flow (requires API call)
      try {
        await toast.promise(
          enableChannel(assistantId, rowToUpdate.channelName, rowToUpdate.channelId, credentials),
          {
            pending: 'Enabling channel…',
            success: 'Channel enabled!',
           
            error: {
              render({ data }) {
                return data.message
              }
            }
          }
        )
  
        // ✅ After success, update the state
        setData(prevData => {
          const updated = prevData.map(row => {
            if (row.channelId_Text === channelId_Text) {

              return { ...row, isEnabled: true }
            }

            return row
          })

          setFilteredData(updated)

          return updated
        })
  
      } catch (error) {
       
        console.error('Error enabling channel:', error)
       
      }
    } else {
     
   
        await toast.promise(
          deleteChannel(assistantId, rowToUpdate.channelName, rowToUpdate.channelId, credentials),
          {
            pending: 'Removing channel…',
            success: 'Channel removed!',
            error: { render: ({ data }) => data?.message || 'Removal failed' }
          }
        )

        // Update local state on success
        setData(prevData => {
          const updated = prevData.map(row => {
            if (row.channelId_Text === channelId_Text) {
              return { ...row, isEnabled: false }
            }

            return row
          })
          
          setFilteredData(updated)

          return updated
        })
       
    }
  }
  

  // When user selects a channel, update session
  const updateSessionChannel = async channelId => {
    await update({ currentChannelId: channelId })
  }

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor('channelName', {
        header: 'Type',
        cell: ({ row }) => (
          <div className='flex items-center gap-1'>
            <Typography>{row.original.channelName}</Typography>
            <i className='ri-whatsapp-line text-xl' />
          </div>
        )
      }),
      columnHelper.accessor('channelId_Text', {
        header: 'Identifier',
        cell: ({ row }) => <Typography>{row.original.channelId_Text}</Typography>
      }),
      columnHelper.accessor('channelDisplayName', {
        header: 'Display Name',
        cell: ({ row }) => <Typography>{row.original.channelDisplayName}</Typography>
      }),
      columnHelper.accessor('isEnabled', {
        header: 'Enable',
        cell: ({ row }) => (
          <Switch
            size='small'
            color='success'
            checked={row.original.isEnabled}
            onChange={() => handleEnabledChange(row.original.channelId_Text)}
          />
        )
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => (
          <>
            <IconButton>
              <Link href={getLocalizedUrl(`/apps/channels/settings`, locale)} className='flex'>
                <i
                  className='ri-eye-line text-textSecondary'
                  onClick={() => updateSessionChannel(row.original.channelId)}
                />
              </Link>
            </IconButton>
            <IconButton>
              <Link href={getLocalizedUrl(`/apps/channels/view`, locale)} className='flex'>
                <i
                  className='ri-delete-bin-line text-textSecondary'
                  onClick={() => updateSessionChannel(row.original.channelId)}
                />
              </Link>
            </IconButton>
          </>
        ),
        enableSorting: false
      })
    ],
    [filteredData]
  )

  // Initialize table
  const table = useReactTable({
    data: filteredData,
    columns,
    state: { rowSelection, globalFilter },
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <Card>
      <CardHeader title='Channel Filters' />
      <Divider />
      <div className='flex justify-between p-5 gap-4 flex-col items-start sm:flex-row sm:items-center'>
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder='Search Channel'
          className='max-sm:is-full'
        />
      </div>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classnames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='ri-arrow-up-s-line text-xl' />, 
                          desc: <i className='ri-arrow-down-s-line text-xl' />
                        }[header.column.getIsSorted()] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='text-center'>No channels found</td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classnames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component='div'
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => table.setPageIndex(page)}
        onRowsPerPageChange={e => table.setPageSize(Number(e.target.value))}
      />
    </Card>
  )
}

export default ChannelListTable
