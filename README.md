# Generation of Faith Ministry - Church Management System

A comprehensive church management system built with Node.js/Express backend and HTML/CSS/JavaScript frontend.

## Features

### Core Features
- **Member Management**: Complete member profiles, family grouping, attendance tracking, volunteer management
- **Event Management**: Service scheduling, event calendar, room booking, event registration
- **Giving & Donations**: Online giving, donation tracking, tithing records, tax receipt generation
- **Communication**: Email/SMS notifications, announcements, prayer requests, newsletter system
- **Ministry Management**: Small groups, volunteer scheduling, ministry team coordination
- **Content Management**: Sermon/media library, blog/devotionals, photo galleries

### Technical Features
- **Responsive Design**: Works on all devices (desktop, tablet, mobile)
- **User Authentication**: Secure login system with role-based access control
- **Modern UI**: Clean, professional interface using Bootstrap 5
- **Data Visualization**: Charts and graphs for reports and analytics
- **Real-time Updates**: Dynamic content loading and updates

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (configurable for other databases)
- **JWT** - Authentication
- **Winston** - Logging
- **Nodemailer** - Email services

### Frontend
- **HTML5/CSS3** - Markup and styling
- **JavaScript (ES6+)** - Application logic
- **Bootstrap 5** - UI framework
- **Font Awesome** - Icons
- **FullCalendar** - Event calendar
- **Chart.js** - Data visualization

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (or your preferred database)
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Church Management New Generation"
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   ```
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/generation_of_faith
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_EMAIL=your-email@gmail.com
   SMTP_PASSWORD=your-email-password
   FRONTEND_URL=http://localhost:3000
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. **Start MongoDB**
   ```bash
   # For MongoDB installation
   mongod
   ```

5. **Start Backend Server**
   ```bash
   npm run dev
   ```

6. **Open Frontend**
   Open `frontend/index.html` in your web browser or serve it with a web server:
   ```bash
   # Using Python simple server
   cd frontend
   python -m http.server 3000
   ```

## Usage

### Default Login
- **Email**: admin@example.com
- **Password**: password123

### User Roles
- **Admin**: Full access to all features
- **Pastor**: Access to member management, events, giving reports
- **Leader**: Access to ministry management and events
- **Volunteer**: Limited access to assigned areas
- **Member**: View-only access to public information

### Navigation
- **Dashboard**: Overview of church statistics and recent activities
- **Members**: Complete member management system
- **Events**: Event scheduling and calendar management
- **Giving**: Donation tracking and financial reports
- **Ministries**: Ministry organization and volunteer management
- **Reports**: Analytics and reporting tools
- **Settings**: Church configuration and system settings

## Database Configuration

The system is designed to work with multiple databases. Currently configured for MongoDB:

### MongoDB Setup
1. Install MongoDB on your system
2. Create a database named `generation_of_faith`
3. Update the `MONGODB_URI` in your `.env` file

### Other Database Support
To use other databases (MySQL, PostgreSQL, etc.), update the database connection in `backend/app.js` and install the appropriate driver.

## API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Member Management
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Delete member

### Event Management
- `GET /api/events` - Get all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Giving Management
- `GET /api/giving` - Get all donations
- `POST /api/giving` - Create new donation
- `GET /api/giving/reports` - Get giving reports

### Ministry Management
- `GET /api/ministries` - Get all ministries
- `POST /api/ministries` - Create new ministry
- `PUT /api/ministries/:id` - Update ministry
- `DELETE /api/ministries/:id` - Delete ministry

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: Bcrypt password hashing
- **Role-Based Access Control**: Different access levels for different user types
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Cross-origin resource sharing protection

## Deployment

### Production Deployment

1. **Environment Setup**
   ```bash
   NODE_ENV=production
   ```

2. **Build Process**
   - Minify CSS and JavaScript files
   - Optimize images
   - Configure production database

3. **Server Configuration**
   - Use reverse proxy (Nginx/Apache)
   - Configure SSL/TLS
   - Set up process manager (PM2)

4. **Database Backup**
   - Regular database backups
   - Automated backup scripts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support and questions:
- Email: support@generationoffaith.org
- Documentation: Check the `/docs` folder
- Issues: Report issues on GitHub

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

### Version 1.0.0
- Initial release
- Basic member management
- Event scheduling
- Donation tracking
- Ministry management
- Responsive design
- Authentication system

## Future Enhancements

- Mobile app development
- Advanced reporting features
- Integration with social media
- Live streaming capabilities
- Advanced analytics
- Multi-language support
- SMS integration
- Advanced payment processing
- Volunteer scheduling system
- Resource management
- Advanced security features
