import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
  table: {
    borderCollapse: 'collapse',
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px',
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px',
    },
    inputs: {
      marginBottom: '5px',
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border: 'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  },
};

function PhoneBookForm({ addEntryToPhoneBook }) {
  const [firstName, setFirstName] = useState('Coder');
  const [lastName, setLastName] = useState('Byte');
  const [phone, setPhone] = useState('8885559999');

  const handleUserSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      firstName,
      lastName,
      phone,
    };
    // console.log(userObj);
    addEntryToPhoneBook(userObj);
    setFirstName('');
    setLastName('');
    setPhone('');
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      style={style.form.container}
    >
      <label>First name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname'
        type='text'
        placeholder={firstName}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <label>Last name:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userLastname'
        name='userLastname'
        type='text'
        placeholder={lastName}
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone'
        name='userPhone'
        type='text'
        placeholder={phone}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br />
      <input
        style={style.form.submitBtn}
        className='submitButton'
        type='submit'
        value='Add User'
        onClick={(e) => handleUserSubmit(e)}
      />
    </form>
  );
}

function InformationTable({ users }) {
  let sortedUsers = users.sort((a, b) => a.lastName.localeCompare(b.lastName));

  const usersTable = sortedUsers.map((user, idx) => {
    return (
      <tr key={`${user.firstName}-${idx}`}>
        <th style={style.tableCell}>{user.firstName}</th>
        <th style={style.tableCell}>{user.lastName}</th>
        <th style={style.tableCell}>{user.phone}</th>
      </tr>
    );
  });

  return (
    <table style={style.table} className='informationTable'>
      <thead>
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
        {usersTable}
      </thead>
    </table>
  );
}

function Application(props) {
  const [users, setUsers] = useState([]);
  const addEntryToPhoneBook = (userObj) => {
    setUsers((prevState) => {
      return [...prevState, userObj];
    });
  };

  return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable users={users} />
    </section>
  );
}

ReactDOM.render(<Application />, document.getElementById('root'));
