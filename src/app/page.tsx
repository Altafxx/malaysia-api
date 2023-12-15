import Terminal from "../components/terminal"

export default function Home() {
  return (
    <main>
      <h1>Malaysia API</h1>
      <hr /><br />

      <h2>Overview</h2>
      <p>Malaysia API is an open-source project built with Next.js that aims to centralize and provide easy access to various open data from the government of Malaysia. The project combines data from different sources, offering a unified platform for developers, researchers, and the public to access valuable information seamlessly.</p>
      <br />

      <h2>Features</h2>
      <ul>
        <li><b>Consolidated Data:</b> Malaysia API brings together open data from various sectors of the Malaysian government, making it convenient for users to access a wide range of information in one place.</li>
        <li><b>Developer-Friendly:</b> Built with Next.js, the project provides a developer-friendly environment for contributors to enhance and extend its capabilities.</li>
      </ul>
      <br />

      <h2>NPM Packages Being Used</h2>
      <ol>
        <li>
          <b><a href='https://www.npmjs.com/package/mykad'>mykad:</a></b> A package for working with Malaysian identification card (MyKad) information.</li>
      </ol>
      <br />

      <h2>GitHub Repository</h2>
      <ol>
        <li><b><a href='https://github.com/lomotech/jajahan'>jajahan</a></b> by <b><a href='https://github.com/lomotech'>lomotech</a></b> - Jajahan adalah senarai alternatif untuk negeri, daerah, mukim, dun, bahagian, parlimen di dalam Malaysia. Tujuan asal adalah untuk digunakan di dalam sistem sebagai fix data yang tidak perlu masuk ke database kerana pertukarannya amat sedikit mengikut masa.</li>
      </ol>
      <br />

      <h2>Government Open Data Sources</h2>
      <ol>
        <li><b><a href='https://developer.data.gov.my'>Data Terbuka Sektor Awam:</a></b> Explore public sector open data from the Malaysian government at <b><i><a href='https://developer.data.gov.my'>developer.data.gov.my.</a></i></b></li>
        <li><b><a href='https://sddsa.mampu.gov.my'>Data Dictionary MAMPU:</a></b> Access the data dictionary provided by MAMPU (Malaysian Administrative Modernisation and Management Planning Unit) at <b><i><a href='https://sddsa.mampu.gov.my'>sddsa.mampu.gov.my.</a></i></b></li>
      </ol>
      <br />

      <h2>Getting Started</h2>
      <ol>
        <li>Clone the repository:</li>
        <Terminal text={["git clone https://github.com/Altafxx/malaysia-api.git"]} />
        <li>Install dependencies:</li>
        <Terminal text={["cd malaysia-api", "npm install"]} />
        <li>Run the development server:</li>
        <Terminal text={["npm run dev"]} />
        <li>Open your browser and visit <b><i><a href='http://localhost:3000'>http://localhost:3000</a></i></b> to explore Malaysia API.</li>
      </ol>
      <br />

      {/* <h2>Contribution Guidelines</h2>
      <p>We welcome and encourage contributions from the community. If you would like to contribute, please follow our <b><i><a href='https://github.com/Altafxx/malaysia-api/blob/main/CONTRIBUTING.md'>contribution guidelines</a></i></b>.</p>
      <br /> */}

      <h2>Issues and Feedback</h2>
      <p>If you encounter any issues or have feedback, please <b><i><a href='https://github.com/Altafxx/malaysia-api/issues'>open an issue</a></i></b>.</p>
      <br />

      {/* <h2>License</h2>
      <p>This project is licensed under the <b><i><a href='https://github.com/Altafxx/malaysia-api/blob/main/LICENSE'></a></i></b>MIT License.</p>
      <br /> */}
      <hr /><br />

      <p>Thank you for your interest in Malaysia API! We hope this project serves as a valuable resource for accessing Malaysian government data.</p>
    </main>
  )
}