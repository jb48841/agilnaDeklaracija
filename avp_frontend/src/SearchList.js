import React, { useState, useEffect } from 'react';

import './App.css';

function SearchList() {
    const [name, setName] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [items, setItems] = useState([])
    const [foundPersons, setfoundPersons] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8080/signatures")
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setItems(result);
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const filter = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = items.filter((person) => {
                return person.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setfoundPersons(results);
        }
        else {
            setfoundPersons([])
        }

        setName(keyword);
    };

    if (error) {
        return <div className="container">Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="container">Loading...</div>;
    } else {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Pretraživanje potpisnika manifesta</h1>
                <div className="container">
                    <input
                        type="search"
                        value={name}
                        onChange={filter}
                        className="input"
                        placeholder="Unesite ime potpisnika"
                    />
                    <div className="person-list">
                        {foundPersons && foundPersons.length > 0 ? (
                            foundPersons.map((person) => (
                                <li className="person">
                                    <span className="person-name">{person}</span>
                                </li>
                            ))
                        ) : []}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchList;

