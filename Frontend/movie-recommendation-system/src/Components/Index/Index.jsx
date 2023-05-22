import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index-stylesheet.css"

function Home() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [age, setAge] = useState(18);

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const handleAgeChange = (e) => {
        const value = e.target.value;
        setAge(value)
    }

    const handleSubmit = () => {
        if (name.trim() === "") {
            alert("Please enter a name to continue");
            return;
        }

        if (age > 40 || age < 13) {
            alert("Please enter an age between 13 and 40");
            return;
        }

        navigate("/input", { state: { name: name, age: age } });
    }

    return (
        <div className="index">
            <div className="index-intro">
                <h1>Find your perfect Movie match.<br></br> Let your emotions guide you!</h1>
                <p>Unlock a world of cinematic experiences tailored to your mood by entering your name and age</p>
            </div>

            <div className="index-form">
                <div>
                    <label htmlFor="name">Name :</label>
                    <input type="text" name="name" id="name" value={name} placeholder="Ex.Richard Hendricks" onChange={handleNameChange} />
                </div>
                <div>
                    <label htmlFor="age">Age :</label>
                    <input type="number" name="age" id="age" min="13" max="40" value={age} onChange={handleAgeChange} />
                </div>
                <div>
                    <button onClick={handleSubmit}>Get Started</button>
                </div>
            </div>

            <div className="index-background">
            </div>
        </div>
    )
}

export default Home