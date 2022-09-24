'use strict';
import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form')
const LOCAL_STORAGE_KEY = 'feedback-form-key';


initialPage();

const onFormInput = event => {
    console.log(event.target.value);
    const { name, value } = event.target;
    try {
        let saveData = localStorage.getItem(LOCAL_STORAGE_KEY)
        
        saveData ? saveData = JSON.parse(saveData) : saveData = {};
        saveData[name] = value;
        const stringifyData = JSON.stringify(saveData);
        localStorage.setItem(LOCAL_STORAGE_KEY, stringifyData);
        console.log(localStorage.setItem(LOCAL_STORAGE_KEY));
    } catch (error) {
    }
}
const throttledOnFormInput = throttle(onFormInput, 300);
formRef.addEventListener('input', throttledOnFormInput);

function initialPage() {
    const saveData = localStorage.getItem(LOCAL_STORAGE_KEY)
    console.log(saveData);
    if (!saveData) {
        return;
    }
    try {
        const parseData = JSON.parse(saveData); 
        Object.entries(parseData).forEach(([name, value]) => {
            formRef.elements[name].value = value
        });
    } catch (error) {
        console.log(error);
    }
}

const handleSabmit = event => {
    event.preventDefault()
    const {
    elements: { email, message },
  } = event.currentTarget;
    console.log({ email: email.value, message: message.value });
    event.currentTarget.reset();
    localStorage.removeItem(LOCAL_STORAGE_KEY)
}

formRef.addEventListener('submit', handleSabmit)

