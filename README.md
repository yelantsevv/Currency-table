# [Currency Arbitrage Visualizer](https://yelantsevv.github.io/Currency-table/)

This project utilizes live cryptocurrency trade data from Binance via WebSocke.

  ⚙️ Technologies Used:
 - `React 19.1`
 - `@preact/signals-react` – For fine-grained reactivity and optimized rendering of frequently updating price data.
 - `rxjs/webSocket` – For connecting to the Binance WebSocket API and efficiently handling real-time data streams.
   
 🌐 Data Source:
  - Live trade prices are fetched from:  `wss://stream.binance.com:9443/stream`
    
 💡 Features
 - Real-time currency exchange rates
UI updates optimized with `signals to minimize re-renders`
WebSocket throttling to avoid unnecessary computation
<img width="1598" alt="Screenshot 2025-05-10 at 1 31 39 PM" src="https://github.com/user-attachments/assets/fc6f1cfe-5e35-4462-90b0-a8ce0c03a067" />

