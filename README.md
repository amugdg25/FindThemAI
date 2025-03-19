<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/amugdg25/FindThemAI">
    <img src="/logo.svg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">FindThem</h3>

  <p align="center">
    An AI-powered system that utilizes facial recognition to scan city-wide CCTV footage and assist in finding missing persons.  
    <br />  
  <p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#screenshots">Screenshots</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

**FindThem** is an AI-powered system designed to assist in locating missing persons by scanning city-wide CCTV footage using advanced facial recognition technology. The project aims to bring hope to families by leveraging AI for real-time identification and tracking.

- **AI-Powered Facial Recognition**: Uses cutting-edge deep learning models to match faces from CCTV footage.
- **City-Wide Integration**: Designed to work with existing surveillance networks for seamless operation.

### Built With

- Python
- Flask
- OpenCV
- TensorFlow / PyTorch
- PostgreSQL
- React
- Tailwind CSS

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FEATURES -->

## Features

- **Real-time Face Recognition**: Scans and matches faces from CCTV footage.
- **Missing Persons Database**: Stores and processes reported missing individuals for comparison.
- **Automated Alerts**: Notifies authorities when a potential match is found.
- **Scalable & Secure**: Designed for large-scale city-wide implementation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SCREENSHOTS -->

## Screenshots

_Additional screenshots and GIFs demonstrating functionality can be added here._

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites
Ensure you have the following installed:
- Python (>=3.8)
- PostgreSQL
- Node.js & npm
- Git
- Virtual environment support (venv or virtualenv)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/amugdg25/FindThemAI.git
   cd FindThemAI
   ```

2. **Set up the backend:**
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up the database:**
   ```sh
   sudo -u postgres psql
   \q
   ```
   
4. **Apply migrations:**
   ```sh
   flask db upgrade
   ```

5. **Set up the frontend:**
   ```sh
   cd frontend
   npm install
   npm run dev
   ```

6. **Run the backend:**
   ```sh
   cd backend
   flask run
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->

## Usage

1. Access the frontend at `http://localhost:3000`
2. Use the API endpoints as required (`http://localhost:5000/api/...`)
3. Upload missing person details and images to start the facial recognition process.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


