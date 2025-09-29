# gotLost - React Version

A modern React application for a lost and found system for college students. This project has been converted from the original HTML/CSS/JS version to a fully functional React application.

## 🚀 Features

- **Home Page**: Landing page with service descriptions and recent returns
- **Lost Form**: Report lost items with detailed information
- **Found Form**: Report found items to help others
- **Registration**: User registration with college information
- **About Us**: Information about the platform and its mission
- **Contact Us**: Contact form for user inquiries
- **Login**: User authentication system

## 🛠️ Tech Stack

- **React 19.1.1** - Frontend framework
- **React Router DOM 6.8.1** - Client-side routing
- **Bootstrap 4.3.1** - CSS framework
- **Font Awesome 5.15.4** - Icons
- **Vite** - Build tool and development server

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation component
│   ├── Footer.jsx          # Footer component
│   ├── Navbar.css          # Navigation styles
│   ├── Footer.css          # Footer styles
│   ├── Home.css            # Home page styles
│   ├── LostForm.css        # Lost form styles
│   ├── FoundForm.css       # Found form styles
│   ├── Register.css        # Registration form styles
│   ├── AboutUs.css         # About page styles
│   ├── ContactUs.css       # Contact form styles
│   └── Login.css           # Login form styles
├── App.jsx                 # Main app component with routing
├── App.css                 # Global styles
└── main.jsx                # Entry point

pages/
├── Home.jsx                # Home page component
├── LostForm.jsx            # Lost item form
├── FoundForm.jsx           # Found item form
├── Register.jsx            # User registration
├── AboutUs.jsx             # About page
├── ContactUs.jsx           # Contact form
└── Login.jsx               # Login page

public/
└── images/                 # Static images (placeholders included)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd LostAndFound
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Pages Overview

### Home Page (`/`)
- Hero section with call-to-action
- Service descriptions (Lost & Found)
- Recent returns showcase
- Mission statement
- User testimonials

### Lost Form (`/lost`)
- Form to report lost items
- Fields: Name, Email, Item, Location, Date, Description, Reward
- Form validation and submission handling

### Found Form (`/found`)
- Form to report found items
- Fields: Name, Email, Item, Location, Date, Time, Message
- Form validation and submission handling

### Registration (`/register`)
- User registration form
- Fields: Full Name, Email, Phone, Sex, Year, Branch, Password
- Password confirmation validation

### About Us (`/about`)
- Platform information and mission
- Value propositions
- How the system works
- Community guidelines

### Contact Us (`/contact`)
- Contact form for inquiries
- Fields: Name, Email, Phone, Subject
- Form submission handling

### Login (`/login`)
- User authentication form
- Fields: Username, Password
- Remember me functionality

## 🎨 Styling

The application uses a combination of:
- **Bootstrap 4.3.1** for responsive grid and components
- **Custom CSS** for specific styling and animations
- **Font Awesome** for icons
- **Google Fonts** (Montserrat, Monoton, Lemon) for typography

## 🔧 Customization

### Adding New Pages

1. Create a new component in the `pages/` directory
2. Add the route to `src/App.jsx`
3. Create corresponding CSS file in `src/components/`
4. Import and use the Navbar and Footer components

### Styling

- Global styles are in `src/App.css`
- Component-specific styles are in `src/components/`
- Bootstrap classes can be used throughout the application

## 📝 Form Handling

All forms use React state management with controlled components:
- Form data is stored in component state
- Input changes are handled with `onChange` events
- Form submission is handled with `onSubmit` events
- Basic validation is implemented for required fields

## 🖼️ Images

The application expects images to be placed in the `public/images/` directory. The following images are referenced:

- `lost-and-found.png` - Hero section image
- `community.png` - Community section image
- `lost-card.png` - Lost service card image
- `found-card.png` - Found service card image
- `mission.png` - Mission section image
- Various item images for recent returns
- Form page images (lost-2.jpg, found.jpg, register.jpg, contactus.jpg)
- About page images (shaking_hand.png, cheering.png, etc.)

## 🚀 Deployment

The application can be deployed to any static hosting service:

1. Build the application: `npm run build`
2. Upload the contents of the `dist` directory to your hosting service
3. Ensure all routes are configured to serve `index.html` for client-side routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Original HTML/CSS/JS version contributors
- Bootstrap team for the CSS framework
- Font Awesome for the icon library
- React team for the amazing framework
