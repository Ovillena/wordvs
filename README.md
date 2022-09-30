
<a name="readme-top"></a>

[![LinkedIn][linkedin-shield]][linkedin-url]

<br />
<div align="center">
  <a href="https://github.com/Ovillena/wordvs">
    <!-- <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  </a>

<h1 align="center">WordVS</h1>

  <p align="center">
    A 2-player puzzle game inspired by Wordle. The objective of the game is to guess a 6-letter mystery word and each player will take turns guessing.
    <br/ >
    I created this app to learn and practice different web technologies such as TypeScript, SocketIO, Next.JS, etc.
    <br />
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#front-end-built-with">Front-end Built With</a></li>
        <li><a href="#back-end-built-with">Back-end Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#running-the-app">Running The App</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#project-links">Project Links</a></li>

  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="public/wordvsscreenshot.png" alt="Logo" height="500" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Front-end Built With

[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![Tailwind][tailwindcss.com]][tailwindcss-url]
[![Typescript][typescriptlang.org]][typescriptlang-url]
[![SocketIO][socket.io]][socketio-url]

### Back-end Built With
[![ExpressJS][expressjs.com]][expressjs-url]
[![Typescript][typescriptlang.org]][typescriptlang-url]
[![SocketIO][socket.io]][socketio-url]
[![NodeJS][Node.js]][node-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Here are instructions to run the app locally.
> **Note**
> Unfortunatley, there are typing issues that prevent the app from being built for deployment. These typing complications are due to implementing polymorphism and ES features not being recognized during the build. This is still a work in progress.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* yarn
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo for the front-end
   ```sh
   git clone https://github.com/Ovillena/wordvs.git
   ```
2. Clone the repo for the server
   ```sh
   git clone https://github.com/Ovillena/wordvs-server.git
   ```
   <img src="public/gitclone.png" alt="git-clone-step">
3. Install packages
   ```sh
   cd wordvs
   yarn install
   cd ../wordvs-server
   yarn install
   ```
    <img src="public/yarninstall.png" alt="yarn-install-step">


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Running the app

1. To run the server, open a terminal window for the wordvs-server folder and run the command
   ```sh
   yarn start
   ```
    <img src="public/yarnstart.png" alt="yarn-start">
2. To run the client, open a terminal window for wordvs folder and run the command
   ```sh
   yarn dev
   ```
    <img src="public/yarndev.png" alt="yarn-dev">

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

1. Open 2 instances of localhost:3000 in the browser and enter the same room ID for both instances
    <img src="public/localhost.png" alt="open 2 instances of localhost:3000">
2. Type in a few guesses to play the game
    <img src="public/game.png" alt="game" height="500">
3. Click the chat button to enter the chat feature. Type in a message and press enter or click the arrow icon to send
    <img src="public/chat.png" alt="chat">



See the [open issues](https://github.com/Ovillena/wordvs/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- CONTACT -->
## Contact

* email: octaviovillena.ov@gmail.com
* LinkedIn: [linkedin-url]: https://linkedin.com/in/octavio-villena
* GitHub: [https://github.com/Ovillena](https://github.com/Ovillena)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- PROJECTLINKS -->
## Project Links

* [https://github.com/Ovillena/wordvs](https://github.com/Ovillena/wordvs)
* [https://github.com/Ovillena/wordvs-server](https://github.com/Ovillena/wordvs-server)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Ovillena/wordvs.svg?style=for-the-badge
[contributors-url]: https://github.com/Ovillena/wordvs/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Ovillena/wordvs.svg?style=for-the-badge
[forks-url]: https://github.com/Ovillena/wordvs/network/members
[stars-shield]: https://img.shields.io/github/stars/Ovillena/wordvs.svg?style=for-the-badge
[stars-url]: https://github.com/Ovillena/wordvs/stargazers
[issues-shield]: https://img.shields.io/github/issues/Ovillena/wordvs.svg?style=for-the-badge
[issues-url]: https://github.com/Ovillena/wordvs/issues
[license-shield]: https://img.shields.io/github/license/Ovillena/wordvs.svg?style=for-the-badge
[license-url]: https://github.com/Ovillena/wordvs/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/octavio-villena
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[tailwindcss.com]: https://img.shields.io/badge/TailwindCSS-2338B2?style=for-the-badge&logo=tailwindcss
[tailwindcss-url]: https://tailwindcss.com/
[typescriptlang.org]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[typescriptlang-url]: https://www.typescriptlang.org/
[expressjs.com]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[expressjs-url]: https://expressjs.com/
[socket.io]: https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101
[socketio-url]: https://socket.io/
[node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/