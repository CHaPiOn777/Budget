const calculation = document.querySelector('.expenses__btn-start-calculations'); //кнопка расчтитаь

const income = document.querySelector('.income'); //доход
const oneDay = document.querySelector('.one-day'); //бюджет на 1 день
const incomeLevel = document.querySelector('.income-level'); //уровень дохода
const mandatorySpending = document.querySelector('.mandatory-spending'); //обязательные расходы
const possibleSpending = document.querySelector('.possible-spending'); //возможные траты
const additionalIncome = document.querySelector('.additional-income'); //дополнительный доход
const accumulationFor1Month = document.querySelector('.accumulation-for-1-month'); //накопления на 1 месяц
const accumulationFor1Year = document.querySelector('.accumulation-for-1-year'); //накопления на 1 год
const incomeInput = document.querySelector('.expenses__input-income'); //накопления на 1 год
const btnDayBudget = document.querySelector('.expenses__btn-day'); //накопления на 1 год

const dataYear = document.querySelector('#year');
const dataMonth = document.querySelector('#month');
const dataDay = document.querySelector('#day');

const expensesInput = document.querySelector('#form__expenses-input').content;
const inputRequired = document.querySelector('.btn-form__expenses-input-required');
const addInput = document.querySelector('.expenses__btn-add');
const btnDelete = document.querySelector('.btn__delete');
const expensesBtnApprove = document.querySelector('.expenses__btn-approve');

const expenseOptional = document.querySelectorAll('.expenses__input-optional');
const expenseBtnOptional = document.querySelector('.expenses__btn-optional');

const checkbox = document.querySelector('#accumulation');
const priceInput = document.querySelector('#price');
const procentInput = document.querySelector('#procent');
const priceAccumulations = document.querySelector('.expenses__accumulations');

// if data[savings] === false

let data = {
  income: [],
  expenses: {},
  savings: false,
  sumExpenses: 0,
  sumOptional: 0,
  budget: 0
}

//****************************************
// ФУНКЦИИ
//****************************************

function addCalculation (when, what) {
  when.textContent = what
}

function addCalculationObj (when, what) {
  let i = '';
  let sum = 0;
  for (let key in what) {
    i += `${key}: ${what[key]},` + '\r\n';
    sum += +what[key];
  }
  data.sumExpenses = sum;
  when.textContent = i + `Сумма расходов: ${sum}`;
}

function calculatуDayBudget () {
  data.budgetDay = ((data.budget - data.sumExpenses - data.sumOptional) / 30).toFixed();
  addCalculation(oneDay, data.budgetDay)
}

function divideDate (val) {
  dataYear.value = new Date(Date.parse(val)).getFullYear();
  dataMonth.value = new Date(Date.parse(val)).getMonth() + 1;
  dataDay.value = new Date(Date.parse(val)).getDate();
}

function addValueInput () {
  const inputName = document.querySelectorAll('.expenses__input-name');
  const inputPrice = document.querySelectorAll('.expenses__input-price');
  for (let i = 0; i < inputName.length; i++) {
    data.expenses[inputName[i].value] = inputPrice[i].value;
    addCalculationObj(mandatorySpending, data.expenses);
  }
}

function addFormInput () {

  const inputElement = expensesInput.querySelector('.form__expenses-input').cloneNode(true);
  inputElement.querySelector('.btn__delete').addEventListener('click', () => {
    inputElement.remove()
  })

  return inputElement;
}

//****************************************
// ТЕЛО ПРОГРАММЫ
//****************************************

if (data['savings'] === false) {
  document.getElementById("price").disabled = true;
  document.getElementById("procent").disabled = true;
}

calculation.addEventListener('click', () => {
  for (let i = 0; i < 1; i++) {
    const calculationData = prompt('Введите дату в формате ГГГГ-ММ-ДД', '');
    if ((calculationData[4] === '-') && (calculationData[7] === '-') && (calculationData.length === 10)) {
      data.time = calculationData;
    } else {
      i--
    }
  }
  divideDate(data.time);


  const calculationPrice = +prompt('Введите ваш бюджет на месяц', '');
  data.budget = calculationPrice
  if (calculationPrice > 100000) {
    addCalculation(incomeLevel, 'У вас высокий уровень дохода');
    document.getElementById("income-level").style.color = "green";
  } else if ((50000 < calculationPrice) && (calculationPrice < 100000)) {
    addCalculation(incomeLevel, 'У вас средний уровень дохода');
    document.getElementById("income-level").style.color = "orange";
  } else {
    addCalculation(incomeLevel, 'У вас низкий уровень дохода');
    document.getElementById("income-level").style.color = "red";
  }

  addCalculation(income, calculationPrice)

})

addInput.addEventListener('click', () => {
  inputRequired.before(addFormInput());
})

expensesBtnApprove.addEventListener('click', addValueInput);

expenseBtnOptional.addEventListener('click', () => {
  let sum = 0;
  expenseOptional.forEach((item) => {
    sum += +item.value
  })
  data.sumOptional = sum
  addCalculation(possibleSpending, sum)
})

incomeInput.addEventListener('input', () => {
  data.income = incomeInput.value
  addCalculation(additionalIncome, data.income)
})

btnDayBudget.addEventListener('click', calculatуDayBudget)


checkbox.addEventListener('click', () => {
  if (data['savings'] === false) {
    data['savings'] = true;
    document.getElementById("price").disabled = false;
    document.getElementById("procent").disabled = false;
  } else {
    data['savings'] = false;
    document.getElementById("price").disabled = true;
    document.getElementById("procent").disabled = true;
    accumulationFor1Month.textContent = '';
    accumulationFor1Year.textContent = '';
  }
})

procentInput.addEventListener('input', () => {
  let sumYear = 0,
      sumMonth = 0;

  sumYear = +priceInput.value * (+procentInput.value / 100);
  addCalculation(accumulationFor1Year, sumYear);

  sumMonth = +priceInput.value * (+procentInput.value / 100) / 12;
  addCalculation(accumulationFor1Month, sumMonth);
})

































