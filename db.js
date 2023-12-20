import mysql from "mysql2";
import express from 'express';

const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'library',
}

const connection = mysql.createConnection(dbConfig);
const pool = mysql.createPool(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to SQL:', err);
    return;
  }
  console.log('Connected to SQL');
});

app.get('/', (req, res) => {
  return res.json("welcome to database of library");
})

const endPoints = [
  {
    endPoint: '/addresses',
    table: 'Address'
  },
  {
    endPoint: '/books',
    table: 'Book'
  },
  {
    endPoint: '/authors',
    table: 'Author'
  },
  {
    endPoint: '/members',
    table: 'Member'
  },
  {
    endPoint: '/staff',
    table: 'Staff'
  },
  {
    endPoint: '/borrow',
    table: 'Borrow'
  }
]

const sortEndPoints = [
  {
    endPoint: '/booksS',
    table: 'Book',
    sortItem: "BookName",
    sortType : "ASC"
  },
  {
    endPoint: '/booksN',
    table: 'Book',
    sortItem: "BookName",
    sortType : "DESC"
  },
  {
    endPoint: '/authorsS',
    table: 'Author',
    sortItem: "FirstName",
    sortType : "ASC"
  },
  {
    endPoint: '/authorsN',
    table: 'Author',
    sortItem: "FirstName",
    sortType : "DESC"
  },
  {
    endPoint: '/membersS',
    table: 'Member',
    sortItem: "FirstName",
    sortType : "ASC"
  },
  {
    endPoint: '/membersN',
    table: 'Member',
    sortItem: "FirstName",
    sortType : "DESC"
  },
]

for (let i = 0; i < sortEndPoints.length; i++) {
  app.get(sortEndPoints[i].endPoint, (req, res) => {
    pool.query(`SELECT * FROM ${sortEndPoints[i].table} ORDER BY ${sortEndPoints[i].sortItem} ${sortEndPoints[i].sortType}`, (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error connecting to the database' });
      }
      res.json(results);
    });
  });
}

for (let i = 0; i < endPoints.length; i++) {
  app.get(endPoints[i].endPoint, (req, res) => {
    pool.query(`SELECT * FROM ${endPoints[i].table}`, (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Error connecting to the database' });
      }
      res.json(results);
    });
  });
}

const query = `select Borrow.Id, Member.FirstName, Member.LastName, Member.NationalCode, 
Book.BookName, Borrow.BorrowDate, Borrow.ReturnDate from 
((Borrow
INNER JOIN Member ON Borrow.BorrowerName = Member.NationalCode)
INNER JOIN Book ON Borrow.BookName = Book.Isbn)`;

app.get('/listOfLoans', (req, res) => {
  pool.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error connecting to the database' });
    }
    res.json(results);
  });
});

app.post('/borrow', (req, res) => {
  const b = req.body;
  const query = 'INSERT INTO Borrow (Id, BorrowerName, BookName, BorrowDate, ReturnDate) VALUES (?,?,?,?,?)';
  pool.query(query, [b.id, b.borrowerName, b.bookName, b.borrowDate, b.returnDate], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error connecting to the database' });
    }
    res.json(results);
  });
})

app.post('/members', (req, res) => {
  const m = req.body;
  const query = 'INSERT INTO Member (FirstName, LastName, DateOfBirth, NationalCode, Education, Address, PhoneNumber, MemberShipDate) VALUES (?,?,?,?,?,?,?,?)';
  pool.query(query, [m.firstName, m.lastName, m.dateOfBirth, m.nationalCode, m.education, m.address, m.phoneNumber, m.memberShipDate], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error connecting to the database' });
    }
    res.json(results);
  });
})

app.delete('/members/:NationalCode', (req, res) => {
  const itemIdToDelete = req.params.NationalCode;
  pool.query('DELETE FROM Member WHERE NationalCode = ?', [itemIdToDelete], (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Error deleting item' });
    }
    res.json({ message: `Item with ID ${itemIdToDelete} deleted successfully` });
  });
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});