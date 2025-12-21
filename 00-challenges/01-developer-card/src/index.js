import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const emoji = {
  strong: "💪",
  good: "👍",
  learning: "🎓",
};

const devData = [
  {
    id: 1,
    name: "Fintan Spruce",
    description:
      "Junior full-stack developer, looking to break into the tech industry. When not coding or learning new things, I like to play videogames, cook great food, and watch copious amounts of Doctor Who!",
    image: "dev-images/fintan.jpg",
    skillset: [
      ["HTML", "strong"],
      ["CSS", "strong"],
      ["JavaScript", "strong"],
      ["Git and GitHub", "good"],
      ["React", "learning"],
      ["C#", "learning"],
    ],
  },
  {
    id: 2,
    name: "Robbie Williams",
    description: "Musician turned developer, looking to have an ape of a time!",
    image: "dev-images/blonde_robbie_monkey.png",
    skillset: [
      ["Python", "strong"],
      ["C++", "strong"],
      ["Git and GitHub", "strong"],
      ["Django", "good"],
      ["SQL", "learning"],
    ],
  },
  {
    id: 3,
    name: "John Lennon",
    description:
      "Musician turned developer, inspired by the story of Robbie. Once a member of the largest band of all time, now working with computers. We made the way with apple, how much more difficult could it be?",
    image: "dev-images/john-lennon.png",
    skillset: [
      ["BASIC", "strong"],
      ["FORTRAN", "good"],
      ["COBOL", "good"],
      ["Pascal", "learning"],
      ["C", "learning"],
    ],
  },
];

function App() {
  const devs = devData;
  const numDevs = devs.length;
  return numDevs > 0 ? (
    <ul className="cards-container">
      {devs.map((dev) => (
        <Card devObj={dev} key={dev.id} />
      ))}
    </ul>
  ) : null;
}

function Card({ devObj }) {
  return (
    <li className="card">
      <Avatar imageSrc={devObj.image} altText={devObj.name} />
      <div className="data">
        <Intro name={devObj.name} description={devObj.description} />
        {/* 
        Should contain one Skill component for each
        web dev skill that you have, customised with
        props.
        */}
        <SkillList skillset={devObj.skillset} />
      </div>
    </li>
  );
}

function Avatar({ imageSrc, altText }) {
  return <img src={imageSrc} alt={altText} className="avatar" />;
}

function Intro({ name, description }) {
  return (
    <main>
      <h1>{name}</h1>
      <p>{description}</p>
    </main>
  );
}

function SkillList({ skillset }) {
  return (
    <ul className="skill-list">
      {skillset.map((skill) => (
        <SkillItem key={skill[0]} text={skill[0]} emojiName={skill[1]} />
      ))}
    </ul>
  );
}

function SkillItem({ text, emojiName }) {
  return (
    <li className={`skill ${emojiName}`}>
      {text} {emoji[emojiName]}
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Use function if specific filtering of developers is required before displaying the cards.
// function getDev(id) {
//   return devData.filter((dev) => dev.id === id)[0];
// }
