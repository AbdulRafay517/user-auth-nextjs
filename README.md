# User Authentication - Next.js

A modern, secure user authentication system built with Next.js 15, featuring beautiful UI, JWT-based authentication, and MongoDB integration.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with encrypted passwords
- **Modern UI/UX**: Beautiful, responsive design with dark mode support
- **Real-time Feedback**: Toast notifications for user actions
- **Production Ready**: Optimized for deployment on Vercel
- **TypeScript**: Full TypeScript support for better development experience
- **MongoDB Integration**: Scalable database solution
- **Responsive Design**: Works perfectly on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: JWT, bcryptjs
- **Database**: MongoDB with Mongoose
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd user-auth-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update the `.env.local` file with your configuration:
   ```env
   MONGO_URI=your-mongodb-connection-string
   TOKEN_SECRET=your-super-secret-jwt-token-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

### Deploy to Vercel

1. **Push your code to GitHub**

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `MONGO_URI`: Your MongoDB connection string
     - `TOKEN_SECRET`: Your JWT secret key

3. **Deploy**
   - Vercel will automatically deploy your app
   - Your app will be available at `https://your-app.vercel.app`

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `TOKEN_SECRET` | JWT secret key for token signing | Yes |

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── users/
│   │       ├── login/
│   │       ├── logout/
│   │       ├── me/
│   │       └── signup/
│   ├── login/
│   ├── profile/
│   ├── signup/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── dbConfig/
├── helpers/
├── middleware.ts
└── models/
```

## 🔐 Authentication Flow

1. **Signup**: Users create accounts with email, username, and password
2. **Login**: Users authenticate with email and password
3. **JWT Token**: Secure tokens are stored in HTTP-only cookies
4. **Protected Routes**: Middleware protects routes based on authentication status
5. **Profile Management**: Users can view and manage their profiles

## 🎨 UI Components

- **Landing Page**: Beautiful hero section with feature highlights
- **Login/Signup Forms**: Modern, accessible forms with validation
- **Profile Dashboard**: Comprehensive user profile management
- **Loading States**: Smooth loading animations
- **Toast Notifications**: Real-time user feedback

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## 🛡️ Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Secure authentication tokens
- **HTTP-only Cookies**: Secure cookie storage
- **Input Validation**: Server-side validation
- **CORS Protection**: Cross-origin request protection
- **Security Headers**: XSS and clickjacking protection

## 📱 Responsive Design

- Mobile-first approach
- Dark mode support
- Accessible design
- Smooth animations
- Touch-friendly interfaces

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-username/user-auth-nextjs/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

**Built with ❤️ using Next.js 15**
