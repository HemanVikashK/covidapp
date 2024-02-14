CREATE DATABASE covidapp;
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    dob DATE,
    aadhar BIGINT,
    phone BIGINT,
    address VARCHAR(100),
    email VARCHAR(100),
    username VARCHAR(100),
    password VARCHAR(100),
    isAdmin BOOLEAN,
    Booked BOOLEAN
);
CREATE TABLE center(
    id SERIAL PRIMARY KEY,
    hname VARCHAR(100),
    location VARCHAR(100),
    seats INT,   
    date DATE
);

CREATE TABLE seats (
    assignment_id SERIAL PRIMARY KEY,
    user_id      INT REFERENCES users(id),
    center_id    INT REFERENCES center(id),
    seat_number  INT,
    CONSTRAINT unique_assignment UNIQUE (user_id, center_id, seat_number)
);


SELECT users.*
FROM users
JOIN seats ON users.id = seats.user_id
WHERE seats.center_id = 3;



