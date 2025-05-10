# [Currency Arbitrage Visualizer](https://yelantsevv.github.io/Currency-table/)

This project utilizes live cryptocurrency trade data from Binance via WebSocke.

 - [x] ⚙️ Technologies Used
 - rxjs/webSocket – For connecting to the Binance WebSocket API and efficiently handling real-time data streams.
 - @preact/signals-react – For fine-grained reactivity and optimized rendering of frequently updating price data.
 - React + Vite – For fast development and modern frontend tooling.
 - [x] 🌐 Data Source
  - Live trade prices are fetched from:
  -  wss://stream.binance.com:9443/stream
 - [x] 💡 Features
 - Real-time currency exchange rates
UI updates optimized with signals to minimize re-renders
WebSocket throttling to avoid unnecessary computation
<img width="1643" alt="Screenshot 2025-05-09 at 11 43 16 PM" src="https://github.com/user-attachments/assets/e5569758-d25e-4ec1-a0dd-1dcbc044be5a" />
