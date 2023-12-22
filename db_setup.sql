CREATE TABLE users (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    email VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL
);

CREATE TABLE cart (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    user_id INT NOT NULL,
    created DATE NOT NULL,
    FOREIGN KEY user_id REFERENCES users(id)
);

CREATE TABLE products (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    name VARCHAR(50) NOT NULL,
    price BIGINT NOT NULL,
    description TEXT
);

CREATE TABLE cart_item (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    qty INT NOT NULL,
    FOREIGN KEY cart_id REFERENCES cart(id),
    FOREIGN KEY product_id REFERENCES products(id)
);

CREATE TABLE orders (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    total INT NOT NULL,
    userid INTEGER NOT NULL,
    created DATE NOT NULL,
    FOREIGN KEY userid REFERENCES users(id)
);

CREATE TABLE order_product (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    qty INT NOT NULL,
    price INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT
    FOREIGN KEY order_id REFERENCES orders(id),
    FOREIGN KEY product_id REFERENCES products(id)
);

INSERT INTO products (name, price description)
VALUES ('Krogan Shotgun', 15, 'Lethal at close range');

INSERT INTO products (name, price, description)
VALUES ('Leviathan Pistole', 8, 'High velocity projectiles');