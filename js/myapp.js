document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        getUserData();
        getTransactions();
      const dashboardPage = document.getElementById('dashboardPage');
      if (dashboardPage) {
        
        getTransactionDetails();
      }
      const transactiondetailsPage = document.getElementById('transactiondetails');
      if (transactiondetailsPage) {
        getTransactionDetails();
      }
    } else {
      window.location.href = 'index.html';
    }
  });
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    fetch('json/login.json')
      .then(response => response.json())
      .then(data => {
        if (username === data.username && password === data.password) {
          window.location.href = 'dashboard.html';
          localStorage.setItem('isLoggedIn', 'true');
        } else {
          alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
      });
  }
  
  function getUserData() {
    fetch('json/userdata.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('userName').textContent = data.name;
        document.getElementById('accountNumber').textContent = data.accountNumber;
        document.getElementById('balance').textContent = data.balance;
      });
  }
  
  function getTransactions() {
    fetch('json/transactions.json')
      .then(response => response.json())
      .then(data => {
        const transactionList = document.getElementById('transactionList');
        data.forEach(transaction => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = `Transacción ${transaction.id}`;
          link.onclick = function() {
            localStorage.setItem('transactionId', transaction.id);
            window.location.href = 'transactiondetails.html';
          };
          li.appendChild(link);
          transactionList.appendChild(li);
        });
      });
  }
  
  function getTransactionDetails() {
    const transactionId = localStorage.getItem('transactionId');
    if (transactionId) {
      fetch('json/transactiondetails.json')
        .then(response => response.json())
        .then(data => {
          const transaction = data;
          document.getElementById('amount').textContent = transaction.amount;
          document.getElementById('date').textContent = transaction.date;
          document.getElementById('code').textContent = transaction.code;
          document.getElementById('description').textContent = transaction.description;
        });
    }
  }
  

  