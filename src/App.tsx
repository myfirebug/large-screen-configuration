import React, { Suspense, lazy, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { setTheme, IThemeName, themeList } from "./core/theme";
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));

function App() {
  const [currentTheme, setCurrentTheme] = useState<IThemeName>("theme01");
  return (
    <div>
      <select
        value={currentTheme}
        onChange={(e) => {
          const value = e.target.value as IThemeName;
          setCurrentTheme(value);
          setTheme(value);
        }}
      >
        {themeList.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <h1>App</h1>
      <ul>
        <li>
          <Link to="/home">home</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
