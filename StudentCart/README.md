# Student Cart - Enhanced Marketplace

A modern React-based marketplace application for students to buy and sell second-hand items. Built with React, Tailwind CSS, and modern web technologies.

## Features

### 🛍️ Marketplace
- **The Hub**: Browse items by category (Electronics, Books, Furniture, Clothing)
- **The Archives**: Search and filter through all available items
- ~~**Video Calls**: Connect with sellers/buyers via video calls with recording capability~~ *(Disabled)*

### 🛒 Shopping Experience
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Track orders, view order history
- **Address Management**: Manage multiple delivery addresses
- **Checkout Process**: Multi-step checkout with payment options

### 🎨 User Interface
- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Works on all device sizes
- **Custom Cursor**: Interactive cursor effects
- **Particle Background**: Animated background effects
- **Modern UI**: Clean, professional design with Tailwind CSS
- ~~**Video Calling**: WebRTC integration with recording~~ *(Disabled)*

### 🔐 User Management
- **Authentication**: Login/Register system
- **User Profiles**: Manage user information
- **Session Management**: Persistent login state

## Technology Stack

- **Frontend**: React 18, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Authentication**: Appwrite
- **Database**: Appwrite Database
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Fonts**: Google Fonts (Inter, Orbitron)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.jsx      # Navigation header
│   ├── Hub.jsx         # Main marketplace section
│   ├── Archives.jsx    # Item browsing section
│   ├── VideoSection.jsx # Video calling interface (DISABLED)
│   ├── LoginModal.jsx  # Authentication modal
│   ├── CartModal.jsx   # Shopping cart modal
│   ├── OrdersModal.jsx # Order management modal
│   ├── AddressModal.jsx # Address management modal
│   ├── CheckoutModal.jsx # Checkout process modal
│   ├── CustomCursor.jsx # Custom cursor component
│   └── ParticleBackground.jsx # Animated background
├── contexts/           # State management
│   ├── AppContext.jsx  # Global application state
│   └── AuthContext.jsx # Authentication context
├── lib/               # External service integrations
│   └── appwrite.js    # Appwrite configuration and helpers
├── config/            # Configuration files
│   └── appwrite.js    # Appwrite settings
├── utils/             # Utility functions
│   └── testAuth.js    # Authentication testing utilities
├── pages/              # Page components
│   └── Home.jsx        # Main home page
├── hooks/              # Custom React hooks
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and CSS variables
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd StudentCart
```

2. Install dependencies:
```bash
npm install
```

3. Set up Appwrite:
   - Follow the [Appwrite Setup Guide](./APPWRITE_SETUP.md)
   - Copy `env.example` to `.env` and fill in your Appwrite credentials

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features in Detail

### The Hub
- Category-based browsing
- Interactive category cards
- Real-time item display
- Add to cart functionality

### The Archives
- Advanced filtering (category, search term)
- Sorting options (newest, oldest, price)
- Grid layout with item cards
- Responsive design

### ~~Video Calls~~ *(Disabled)*
- ~~WebRTC-based video calling~~
- ~~Screen recording capability~~
- ~~Interactive controls~~
- ~~Modern video interface~~

### Shopping Cart
- Persistent cart state
- Quantity management
- Real-time price calculation
- Easy checkout process

### Order Management
- Order tracking
- Status updates
- Order history
- Cancellation support

### Address Management
- Multiple addresses
- Default address selection
- Form validation
- CRUD operations

## Customization

### Themes
The application supports both light and dark themes. Theme preferences are saved in localStorage.

### Colors
Main colors can be customized in `tailwind.config.js`:
- Accent: `#0077be` (light) / `#00F0FF` (dark)
- Background: `#f8f9fa` (light) / `#0D0D0D` (dark)

### Fonts
- Primary: Inter (body text)
- Headings: Orbitron (titles and headings)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Google Fonts for the typography
- All contributors and users