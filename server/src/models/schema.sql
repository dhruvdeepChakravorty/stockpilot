CREATE TABLE
    warehouses (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        address TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW ()
    );

CREATE TABLE
    items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        sku VARCHAR(50) UNIQUE NOT NULL, --unique code for item
        reorder_threshold INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW ()
    );

CREATE TABLE
    suppliers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        address TEXT NOT NULL,
        phone_no VARCHAR(20),
        created_at TIMESTAMPTZ DEFAULT NOW ()
    );

CREATE TABLE
    stock_movements (
        id SERIAL PRIMARY KEY,
        item_id INTEGER REFERENCES items (id) NOT NULL,
        warehouse_id INTEGER REFERENCES warehouses (id) NOT NULL,
        supplier_id INTEGER REFERENCES suppliers (id),
        quantity INTEGER NOT NULL,
        movement_type VARCHAR(20) NOT NULL CHECK (
            movement_type IN ('restock', 'sale', 'transfer', 'adjustment')
        ),
        created_at TIMESTAMPTZ DEFAULT NOW ()
    );