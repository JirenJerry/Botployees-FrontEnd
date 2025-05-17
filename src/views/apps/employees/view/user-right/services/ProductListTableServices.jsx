'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// Next Imports
import Link from 'next/link'
import { useParams } from 'next/navigation'

// Auth Imports
import { useSession } from 'next-auth/react' // <-- Import session hook

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Button from '@mui/material/Button'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import TablePagination from '@mui/material/TablePagination'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

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

const ProductListTableServices = ({ productData }) => {
  // States
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState([...productData])
  const [globalFilter, setGlobalFilter] = useState('')

  // Get user session
  const { data: session } = useSession()
  const authToken = session?.user?.token // <-- Adjust based on session structure

  const saveEmployeeServices = async servicesData => {
    try {
   

      const credentials = btoa(`${session.user?.id}@${session.user?.businessId}`)

      // Filter services that have acceptService or deniesService
      const filteredData = servicesData.filter(
        item => item.hasOwnProperty('acceptService') || item.hasOwnProperty('deniesService')
      )

      // Separate accepted and denied services
      const accepts = filteredData.filter(service => service.acceptService).map(service => service._id)

      const denies = filteredData.filter(service => service.deniesService).map(service => service._id)

      const requestBody = {
        services: {
          accepts,
          denies
        }
      }
     
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/customers/employees/${session.currentEmployeeId}/services`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${credentials}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        }
      )

      if (!res.ok) {
        throw new Error('Failed to update employee services')
      }

      const responseData = await res.json()
 
      return responseData
    } catch (error) {

      console.error('Error updating employee services:', error)

      return null

    }
  }

  const handleAcceptChange = rowId => {
    setTimeout(() => {
      setData(prevData =>
        prevData.map(row => {
          if (row._id === rowId) {
            return {
              ...row,
              acceptService: !row.acceptService,
              deniesService: row.acceptService ? row.deniesService : false

            }
          }
          
          return row
        })
      )
    }, 100)
  }

  const handleDenyChange = rowId => {
    setTimeout(() => {
      setData(prevData =>
        prevData.map(row => {
          if (row._id === rowId) {
            return {
              ...row,
              deniesService: !row.deniesService,
              acceptService: row.deniesService ? row.acceptService : false
           
            }
          }

          return row

        })
      )
    }, 100)
  }

  const { lang: locale } = useParams()

  const columnHelper = createColumnHelper()

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'SERVICE',
        cell: ({ row }) => (
          <div className='flex items-center gap-4'>
            <div className='flex flex-col'>
              <Typography className='font-medium' color='text.primary'>
                {row.original.name}
              </Typography>
            </div>
          </div>
        )
      }),
      columnHelper.accessor('acceptService', {
        header: 'ACCEPTS',
        cell: ({ row }) => (
          <Switch
            color='success'
            checked={row.original.acceptService || false}
            onChange={() => handleAcceptChange(row.original._id)}
          />
        ),
        enableSorting: false
      }),
      columnHelper.accessor('deniesService', {
        header: 'DENIES',
        cell: ({ row }) => (
          <Switch
            color='error'
            checked={row.original.deniesService || false}
            onChange={() => handleDenyChange(row.original._id)}
          />
        ),
        enableSorting: false
      }),
      columnHelper.accessor('actions', {
        header: 'Actions',
        cell: ({ row }) => (
          <div className='flex items-center'>
            <IconButton size='small'>
              <i className='ri-edit-box-line text-[22px] text-textSecondary' />
            </IconButton>
          </div>
        ),
        enableSorting: false
      })
    ],
    [data]
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: rankItem
    },
    state: {
      rowSelection,
      globalFilter
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    enableRowSelection: true,
    globalFilterFn: rankItem,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  return (
    <Card>
      <CardHeader title='Services List' className='pbe-4' />
      <Divider />
      <div className='flex justify-between p-5'>
        <TextField
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder='Search Service'
          size='small'
        />
        <Button
          variant='contained'
          component={Link}
          href={getLocalizedUrl('/apps/business/products/add', locale)}
          startIcon={<i className='ri-add-line' />}
        >
          Add Service
        </Button>
      </div>
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Divider />
      <div className='flex justify-end p-5'>
        <Button variant='contained' onClick={async () => await saveEmployeeServices(data)}>
          Save
        </Button>
      </div>
    </Card>
  )
}

export default ProductListTableServices
