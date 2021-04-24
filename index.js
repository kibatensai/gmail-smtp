const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3010

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

let smtp_login = process.env.SMTP_LOGIN || '---'
let smtp_password = process.env.SMTP_PASSWORD || '---'

// SMTP Transporter
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: smtp_login,
        pass: smtp_password
    },
    tls: {
        rejectUnauthorized: false
      }
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/sendMessage', async (req, res) => {
    let {name, email, message} = req.body

    try {
    let info = await transporter.sendMail({
        from: "Guest of CV Website", // who sends
        to: "dave.p.business@gmail.com", //who receives
        subject: "EMAIL FROM CV WEBSITE", // subject line
        html: `
            <b>Письмо от интересанта с моего сайта CV </b>
            <br />
            <div>
                <b>Email: </b> ${email}
            </div>
            <br/>
            <div>
                <b>Name: </b> ${name}
            </div>
            <br/>
            <div>
                <b>Message: </b>${message}
            </div>`

    })
    console.log('finished')

    } catch (error) {
        console.log('error : ' + error)
    }
    res.send('ok')


  })

app.listen(port, () => {
  console.log(`GMAIL-SMTP listening at http://localhost:${port}`)
})