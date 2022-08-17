import {getRandomArbitrary} from './globalFunc.js';
import {rus, en} from './settings.js'

const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes() {
   let quotes;
	try {
      if (en.classList.contains('active')) {
         quotes = 'https://type.fit/api/quotes';
      }
      if (rus.classList.contains('active')) {
         quotes = 'data.json';
      }
		const res = await fetch(quotes);
		const data = await res.json();

      if (en.classList.contains('active')) {
         let quoteNum = getRandomArbitrary(0, 1642);
         quote.textContent = `"${data[quoteNum].text}"`;
         (data[quoteNum].author === null) ? author.textContent = 'Anonymous' : author.textContent = data[quoteNum].author;
      }
      if (rus.classList.contains('active')) {
         let quoteNum = getRandomArbitrary(0, 20);
         quote.textContent = `"${data[quoteNum].text}"`;
         author.textContent = `${data[quoteNum].author}`
      }
		
	} catch (err) {
		showQuoteError();
	}
}

function showQuoteError() {
   if (en.classList.contains('active')) {
      quote.textContent = 'Error! quote not found';
   }
	if (rus.classList.contains('active')) {
      quote.textContent = 'Ошибка! Цитата не найдена';
   }
	author.textContent = '';
}

changeQuote.addEventListener('click', getQuotes);
rus.addEventListener('click', getQuotes);
en.addEventListener('click', getQuotes);

export {getQuotes, quote, author}