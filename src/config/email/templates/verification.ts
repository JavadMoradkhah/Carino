export default function (vcode: number) {
  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
            <meta charset="UTF-8" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet" />
            <title>Email Verification</title>
            <style>
            *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
            body { padding: 20px; color: #464c5a; text-align: left !important; line-height: 1.15; font-family: Poppins, Arial, Helvetica, sans-serif; background-color: #f3f3f3; }
            .text-primary { color: dodgerblue }
            .text-light {color: #8d929c; }
            .text-black {color: #333944; }
            .text-bold {font-weight: bold; }
            .m-0 {margin: 0; }
            .my-1 {margin-top: 1rem;margin-bottom: 1rem;}
            .email-container {border-radius: 0.5rem;background-color: white;border: 1px solid rgb(234, 234, 235);}
            .email-header { padding: 10px 20px; border-bottom: 1px solid rgb(234, 234, 235); }
            .email-content { padding: 20px; }
            </style>
        </head>
        <body>
            <div class="email-container">
                <header class="email-header"><h1 class="text-primary m-0">Carino</h1></header>
                <main class="email-content">
                    <h2>Welcome to the <span class="text-primary">Carino</span></h2>
                    <p class="my-1">Here is your verification code to sign up: <span class="text-bold text-black">${vcode}</span></p>
                    <p>We hope you will have great deals with Carino.</p>
                    <p class="text-light my-1">Regards, Carino Team</p>
                </main>
            </div>
        </body>
    </html>
    `;
}
