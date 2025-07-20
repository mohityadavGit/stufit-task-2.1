import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Stufit | Test Page</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%);

          color: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
          padding: 2rem;
          text-align: center;
          max-width: 500px;
        }
        .card h1 {
          font-size: 2.5rem;
          margin: 0;
          color: #2c3e50;
        }
        .card p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 1rem 0;
        }
        .card .tagline {
          font-size: 1.3rem;
          color: #e74c3c;
          margin: 0.5rem 0;
        }
        .card .footer {
          font-size: 0.9rem;
          color: #888;
          margin-top: 1.5rem;
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Stufit</h1>
        <p>Stufit Approach Pvt. Ltd. is a health‑tech startup based in Lucknow, specializing in comprehensive health screening for school‑going children — covering physical, dental, vision, nutrition, mental health & more.</p>
        <div class="tagline">“Driven by innovation, rooted in Lucknow.”</div>
        <p>Founded in 2018 by Dr. Syed Shujat Haider Jafri, Stufit is incubated at IET Lucknow’s Navyug Navachar Foundation and is recognized by Startup India & StartinUP. It aims for early disease detection via digital report cards and health insurance cover for students.</p>
        <div class="footer">📍 Lucknow | 🌐 <a href="https://stufit.in" target="_blank">stufit.in</a></div>
      </div>
    </body>
    </html>
  `;
}

}
