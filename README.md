# Real-Time Stock Tracker

A Web Application for tracking stock prices in real-time using Finnhub's WebSocket API.

## Features

- Real-time stock price tracking
- Price alerts
- Responsive design
- Multiple stock tracking

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui components
- Recharts for data visualization
- Finnhub WebSocket API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Finnhub API key (Get one at [Finnhub.io](https://finnhub.io))

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/stock-tracker-pwa
cd stock-tracker-pwa
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```env
VITE_FINNHUB_API_KEY=your_api_key_here
```

4. Start the development server:

```bash
npm run dev
```

## Usage

1. Enter a stock symbol (e.g., AAPL, MSFT)
2. Set an alert price
3. Click "Add Stock" to start tracking
4. View real-time updates in the cards and chart

## Browser Support

The application supports all modern browsers with WebSocket capabilities:

- Chrome (latest)
- Firefox (latest)
- Brave (latest)
- Safari (latest)
- Edge (latest)

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
