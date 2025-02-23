const previousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
const dayBeforePreviousDay = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2)

export const db =      {
    "profileUser": {
        "id": "asst_ArymJE1hA0IzPLk9VuWY43fy",
        "avatar": "/images/avatars/robot.png",
        "fullName": "Assistant placeholder name",
        "role": "Admin",
        "about": "Assistant description placeholder",
        "status": "online",
        "settings": {
            "isTwoStepAuthVerificationEnabled": true,
            "isNotificationsOn": false
        }
    },
    "contacts": [
        {
            "id": "testUser",
            "fullName": "testUser",
            "role": "Frontend Developer",
            "about": "Brief info about contact...",
            "avatar": "/images/avatars/2.png",
            "status": "offline"
        },
        {
            "id": "50687870617",
            "fullName": "50687870617",
            "role": "Frontend Developer",
            "about": "Brief info about contact...",
            "avatar": "/images/avatars/2.png",
            "status": "offline"
        },
        {
            "id": "50672763067",
            "fullName": "Jerry Rivera",
            "role": "Frontend Developer",
            "about": "Brief info about contact...",
            "avatar": "/images/avatars/2.png",
            "status": "offline"
        }
    ],
    "chats": [
        {
            "id": "thread_WR7KCOpv8fMua7AKt1Oj9653",
            "userId": "testUser",
            "unseenMsgs": 0,
            "chat": [
                {
                    "message": "hola",
                    "senderId": "testUser",
                    "time": "Sat Feb 15 2025 20:56:33 GMT-0600 (CST)"
                },
                {
                    "message": "¡Hola! 👋 Bienvenido a \"Barberia Rio Sarchi\". Soy una inteligencia artificial aquí para ayudarte. ¿En qué puedo asistirte hoy? 😊",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sat Feb 15 2025 20:56:38 GMT-0600 (CST)"
                },
                {
                    "message": "quiero agendar una cita",
                    "senderId": "testUser",
                    "time": "Sat Feb 15 2025 20:56:49 GMT-0600 (CST)"
                },
                {
                    "message": "Claro, puedo ayudarte a agendar una cita. 🗓️\n\nPrimero, necesito saber el motivo de tu cita. Por ejemplo, si necesitas un corte de cabello o algún otro servicio específico. ¡Cuéntame! 😊",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sat Feb 15 2025 20:56:51 GMT-0600 (CST)"
                },
                {
                    "message": "corte de cabello, seria para el martes ",
                    "senderId": "testUser",
                    "time": "Sat Feb 15 2025 20:57:11 GMT-0600 (CST)"
                },
                {
                    "message": "Perfecto, entonces para el corte de cabello. 🥳\n\n¿Cuál es la fecha exacta del martes que mencionas? 😊",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sat Feb 15 2025 20:57:13 GMT-0600 (CST)"
                },
                {
                    "message": "este martes",
                    "senderId": "testUser",
                    "time": "Sat Feb 15 2025 20:57:22 GMT-0600 (CST)"
                },
                {
                    "message": "Este martes es el 18 de febrero de 2025. ✨ \n\nDéjame verificar la disponibilidad para esa fecha. Un momento, por favor. ",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sat Feb 15 2025 20:57:24 GMT-0600 (CST)"
                },
                {
                    "message": "ok",
                    "senderId": "testUser",
                    "time": "Sat Feb 15 2025 20:58:05 GMT-0600 (CST)"
                },
                {
                    "message": "¡Genial! 🎉 Hay disponibilidad para el martes 18 de febrero de 2025, en los siguientes horarios:\n\nDe 09:00 a 16:30. 🕘\n\nPor favor, elige un horario específico dentro de esos rangos para tu corte de cabello. 😊",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sat Feb 15 2025 20:58:15 GMT-0600 (CST)"
                },
                {
                    "message": "ok a las 9 am",
                    "senderId": "testUser",
                    "time": "Sat Feb 15 2025 20:59:05 GMT-0600 (CST)"
                },
                {
                    "message": "Perfecto, has elegido el martes 18 de febrero de 2025, a las 9:00 a.m. para tu corte de cabello. ✂️\n\nAhora, por favor, necesito que me proporciones tu dirección de correo electrónico y número de teléfono. Si ya los has proporcionado antes, puedo usar esos valores. ¿Te gustaría proceder con los valores anteriores? 😊",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sat Feb 15 2025 20:59:07 GMT-0600 (CST)"
                },
                {
                    "message": "mi correo es riverderio@gmail.com 72763067",
                    "senderId": "testUser",
                    "time": "Sat Feb 15 2025 20:59:18 GMT-0600 (CST)"
                },
                {
                    "message": "Parece que ya tienes una cita programada para el **17 de febrero de 2025 a las 9:00 a.m.**. Por política de la barbería, solo se puede tener una cita activa a la vez. \n\n¿Te gustaría cancelar esa cita para poder agendar la nueva? 😊✂️",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sat Feb 15 2025 20:59:25 GMT-0600 (CST)"
                },
                {
                    "message": "no, ya hable con el encargado y la cancelo, agendala de nuevo",
                    "senderId": "testUser",
                    "time": "Sat Feb 15 2025 21:01:03 GMT-0600 (CST)"
                },
                {
                    "message": "¡Tu cita ha sido agendada exitosamente! 🎉 \n\n**Detalles de la cita:**\n- **Fecha:** Martes, 18 de febrero de 2025\n- **Hora:** 9:00 a.m.\n- **Empleado:** Up Army\n- **Razón:** Corte de cabello\n- **Contraseña:** CMGGX (necesaria para la cita)\n\nRecibirás una notificación a tu correo electrónico. Si necesitas algo más, ¡no dudes en decírmelo! 😊✂️",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sat Feb 15 2025 21:01:17 GMT-0600 (CST)"
                }
            ]
        },
        {
            "id": "thread_HYIuVm3M3R0FbDRXVqhXDP1F",
            "userId": "50687870617",
            "unseenMsgs": 0,
            "chat": [
                {
                    "message": "Buenas",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 16:08:06 GMT-0600 (CST)"
                },
                {
                    "message": "¡Hola! ¿En qué puedo ayudarte hoy?",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 16:08:08 GMT-0600 (CST)"
                },
                {
                    "message": "Quiero sacar una cita",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 16:08:28 GMT-0600 (CST)"
                },
                {
                    "message": "Claro, puedo ayudarte con eso. Para empezar, ¿me puedes decir el motivo de la cita?",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 16:08:29 GMT-0600 (CST)"
                },
                {
                    "message": "Corte de pelo",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 16:09:43 GMT-0600 (CST)"
                },
                {
                    "message": "Perfecto, para programar tu cita para un corte de pelo, ¿qué día tienes en mente?",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 16:09:45 GMT-0600 (CST)"
                },
                {
                    "message": "Lunes a las 2pm",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 16:11:32 GMT-0600 (CST)"
                },
                {
                    "message": "El próximo lunes es el 19 de febrero. Te refieres a esa fecha, ¿verdad?",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 16:11:34 GMT-0600 (CST)"
                },
                {
                    "message": "Sí",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 16:12:45 GMT-0600 (CST)"
                },
                {
                    "message": "El lunes 19 de febrero hay disponibilidad para el corte de pelo con Up Army, quien se encargará de tu cita. Puedes elegir entre las siguientes horas: de 9:00 AM a 4:30 PM. \n\nDado que querías a las 2:00 PM, está disponible esa hora. ¿Te gustaría confirmar la cita a las 2:00 PM?",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 16:12:57 GMT-0600 (CST)"
                },
                {
                    "message": "Sí",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 16:13:21 GMT-0600 (CST)"
                },
                {
                    "message": "Perfecto, he reservado la cita para el corte de pelo con Up Army el lunes 19 de febrero a las 2:00 PM. \n\nAhora, necesitaré tu dirección de correo electrónico y tu número de teléfono para completar la programación de la cita. Si ya has proporcionado esta información antes, por favor confirma si deseas usar los mismos datos.",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 16:13:30 GMT-0600 (CST)"
                },
                {
                    "message": "Hola",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 19:29:34 GMT-0600 (CST)"
                },
                {
                    "message": "¡Hola! Para completar la programación de tu cita, necesito tu dirección de correo electrónico y tu número de teléfono. ¿Puedes proporcionarlos, por favor?",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 19:29:36 GMT-0600 (CST)"
                },
                {
                    "message": "Quiero agregar una cita",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 19:30:19 GMT-0600 (CST)"
                },
                {
                    "message": "Para agregar una nueva cita, necesitaré saber el motivo de la cita y la fecha y hora que prefieres. ¿Cuál es tu solicitud?",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 19:30:22 GMT-0600 (CST)"
                },
                {
                    "message": "Corte\nLunes \n20m",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 19:32:16 GMT-0600 (CST)"
                },
                {
                    "message": "Para el corte el lunes 20 de febrero, necesito confirmar que te refieres a esa fecha. ¿Puedes confirmar que deseas la cita para el lunes 20 de febrero?",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 19:32:18 GMT-0600 (CST)"
                },
                {
                    "message": "No existe el lunes 20 de febrero",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 19:32:48 GMT-0600 (CST)"
                },
                {
                    "message": "Mis disculpas, el lunes 20 de febrero no existe. El próximo lunes es el 19 de febrero. ¿Te gustaría programar tu cita de corte para esa fecha?",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 19:32:50 GMT-0600 (CST)"
                },
                {
                    "message": "Es lunes 17",
                    "senderId": "50687870617",
                    "time": "Sun Feb 16 2025 19:33:23 GMT-0600 (CST)"
                },
                {
                    "message": "Lo siento por la confusión, pero el próximo lunes es 19 de febrero. Si deseas la cita para ese día, por favor házmelo saber.",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Sun Feb 16 2025 19:33:25 GMT-0600 (CST)"
                }
            ]
        },
        {
            "id": "thread_AF2CEaMtpyB4eCW3tHSn4B7c",
            "userId": "50672763067",
            "unseenMsgs": 0,
            "chat": [
                {
                    "message": "hola",
                    "senderId": "50672763067",
                    "time": "Fri Feb 21 2025 21:17:44 GMT-0600 (CST)"
                },
                {
                    "message": "¡Hola! ¿En qué puedo ayudarte hoy?",
                    "senderId": "asst_ArymJE1hA0IzPLk9VuWY43fy",
                    "time": "Fri Feb 21 2025 21:17:47 GMT-0600 (CST)"
                }
            ]
        }
    ]
}
