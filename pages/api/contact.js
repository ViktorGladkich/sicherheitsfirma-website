// pages/api/contact.js
import { Resend } from 'resend';

// Инициализируем Resend с вашим API ключом из переменных окружения
const resend = new Resend(process.env.RESEND_API_KEY);

// Получаем email адреса из переменных окружения
const emailTo = process.env.EMAIL_TO;
const emailFrom = process.env.EMAIL_FROM;

export default async function handler(req, res) {
  // Мы обрабатываем только POST запросы
  if (req.method === 'POST') {
    // Получаем данные из тела запроса (отправленные из формы)
    const { firstName, lastName, email, message } = req.body;

    // Простая серверная валидация (вы можете ее расширить)
    if (!firstName || !lastName || !email || !message || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Bitte füllen Sie alle Felder korrekt aus.' });
    }

    try {
      // Отправляем email с помощью Resend
      const { data, error } = await resend.emails.send({
        from: `Kontaktformular Webseite <${emailFrom}>`, // Имя отправителя и email (должен быть onboarding@resend.dev или ваш подтвержденный домен)
        to: [emailTo], // Кому отправляем письмо
        subject: `Neue Kontaktanfrage von: ${firstName} ${lastName}`, // Тема письма
        reply_to: email, // Email пользователя, чтобы можно было ответить прямо на него
        html: `
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                h1 { color: #0A2342; } /* brand.blue */
                p { margin-bottom: 10px; }
                strong { font-weight: bold; }
              </style>
            </head>
            <body>
              <h1>Neue Kontaktanfrage</h1>
              <p><strong>Vorname:</strong> ${firstName}</p>
              <p><strong>Nachname:</strong> ${lastName}</p>
              <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Nachricht:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p> {/* Заменяем переносы строк на <br> для HTML */}
            </body>
          </html>
        `,
        text: `Neue Kontaktanfrage erhalten:\n\nVorname: ${firstName}\nNachname: ${lastName}\nE-Mail: ${email}\n\nNachricht:\n${message}`
      });

      // Если есть ошибка от Resend
      if (error) {
        console.error('Resend API Error:', error);
        return res.status(500).json({ success: false, message: 'Fehler beim Senden der E-Mail.', errorDetail: error.message });
      }

      // Если все успешно
      // console.log('Email sent successfully via Resend:', data);
      return res.status(200).json({ success: true, message: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.' });

    } catch (error) {
      // Общая ошибка сервера
      console.error('Server Error sending email:', error);
      return res.status(500).json({ success: false, message: 'Ein interner Serverfehler ist aufgetreten.', errorDetail: error.message });
    }
  } else {
    // Если метод не POST, возвращаем ошибку "Method Not Allowed"
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}