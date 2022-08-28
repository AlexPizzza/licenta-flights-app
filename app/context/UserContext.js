import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { parseString } from 'react-native-xml2js';

const bnrLink = 'https://www.bnr.ro/nbrfxrates.xml';
const currenciesList = [
  {
    currency_iso: 'AED',
    currency_name: 'United Arab Emirates dirham'
  },
  {
    currency_iso: 'AUD',
    currency_name: 'Australian dollar'
  },
  {
    currency_iso: 'BGN',
    currency_name: 'Bulgarian lev'
  },
  {
    currency_iso: 'BRL',
    currency_name: 'Brazilian real'
  },
  {
    currency_iso: 'CAD',
    currency_name: 'Canadian dollar'
  },
  {
    currency_iso: 'CHF',
    currency_name: 'Swiss franc'
  },
  {
    currency_iso: 'CNY',
    currency_name: 'Chinese yuan renminbi'
  },
  {
    currency_iso: 'CZK',
    currency_name: 'Czech koruna'
  },
  {
    currency_iso: 'DKK',
    currency_name: 'Danish krone'
  },
  {
    currency_iso: 'EGP',
    currency_name: 'Egyptian pound'
  },
  {
    currency_iso: 'EUR',
    currency_name: 'Euro'
  },
  {
    currency_iso: 'GBP',
    currency_name: 'British pound sterling'
  },
  {
    currency_iso: 'HRK',
    currency_name: 'Croatian kuna'
  },
  {
    currency_iso: 'INR',
    currency_name: 'Indian rupee'
  },
  {
    currency_iso: 'JPY',
    currency_name: 'Japanese yen'
  },
  {
    currency_iso: 'KRW',
    currency_name: 'South Korean won'
  },
  {
    currency_iso: 'MDL',
    currency_name: 'Moldovan leu'
  },
  {
    currency_iso: 'MXN',
    currency_name: 'Mexican peso'
  },
  {
    currency_iso: 'NOK',
    currency_name: 'Norwegian krone'
  },
  {
    currency_iso: 'NZD',
    currency_name: 'New Zealand dollar'
  },
  {
    currency_iso: 'PLN',
    currency_name: 'Polish złoty'
  },
  {
    currency_iso: 'RON',
    currency_name: 'Romanian leu',
    rate: 1
  },
  {
    currency_iso: 'RSD',
    currency_name: 'Serbian dinar'
  },
  {
    currency_iso: 'RUB',
    currency_name: 'Russian ruble'
  },
  {
    currency_iso: 'SEK',
    currency_name: 'Swedish krona'
  },
  {
    currency_iso: 'TRY',
    currency_name: 'Turkish lira'
  },
  {
    currency_iso: 'UAH',
    currency_name: 'Ukrainian hryvnia'
  },
  {
    currency_iso: 'USD',
    currency_name: 'United States dollar'
  },
  {
    currency_iso: 'ZAR',
    currency_name: 'South African rand'
  }
];

const userReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'add_user_rating':
      return { ...state, userRating: action.payload };
    case 'add_user_location':
      return { ...state, userLocation: action.payload };
    case 'add_user_location_error':
      return { ...state, errorUserLocation: action.payload };
    case 'chkFirstTime':
      return { ...state, isFirstTime: action.payload, errorMessage: '' };
    case 'clear_error_message':
      return { ...state, errorMessage: '' };
    case 'add_currencies':
      return { ...state, currencies: action.payload };
    case 'change_current_currency':
      return { ...state, currentCurrency: action.payload };
    default:
      return state;
  }
};

const checkIsFirstTime = (dispatch) => async () => {
  try {
    const result = await AsyncStorage.getItem('isFirstTime');

    const isFirstTime = JSON.parse(result);

    dispatch({ type: 'chkFirstTime', payload: isFirstTime });
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'An error occured while checking if is user first time.',
      userLocation: ''
    });
  }
};

const setValueIsFirstTime = (dispatch) => async (value) => {
  try {
    const isFirstTime = JSON.stringify(value);
    await AsyncStorage.setItem('isFirstTime', isFirstTime);

    dispatch({ type: 'chkFirstTime', payload: value });
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'An error occured while setting isFirstTime to false.'
    });
  }
};

const addUserRating = (dispatch) => async (rating) => {
  if (rating !== null || rating !== undefined) {
    await AsyncStorage.setItem('rating', JSON.stringify(rating));

    dispatch({
      type: 'add_user_rating',
      payload: rating
    });
  }
};

const getUserRating = (dispatch) => async () => {
  const rating = await AsyncStorage.getItem('rating');
  let numberRating = 3;
  if (rating) {
    numberRating = parseInt(rating);
  }

  if (numberRating !== 3) {
    dispatch({
      type: 'add_user_rating',
      payload: numberRating
    });
  } else {
    dispatch({
      type: 'add_user_rating',
      payload: 3
    });
  }
};

const addUserLocation = (dispatch) => (locationText) => {
  if (locationText === '') {
    dispatch({
      type: 'add_user_location_error',
      payload: 'No location permission provided!'
    });
  } else {
    dispatch({ type: 'add_user_location', payload: locationText });
  }
};

const addUserLocationError = (dispatch) => (errorMsg) => {
  dispatch({ type: 'add_user_location_error', payload: errorMsg });
};

const addCurrencies = (dispatch) => () => {
  axios
    .get(bnrLink)
    .then((response) => response.data)
    .then((response) => {
      parseString(response, function (_err, result) {
        const rates = result.DataSet.Body[0].Cube[0].Rate;
        rates.forEach((rate) => {
          currenciesList.forEach((currency) => {
            if (rate.$.currency === currency.currency_iso) {
              currency.rate = rate._;

              if (
                currency.currency_iso === 'JPY' ||
                currency.currency_iso === 'KRW'
              ) {
                currency.rate = rate._ / 100;
              }
            }
          });
        });
        dispatch({ type: 'add_currencies', payload: currenciesList });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const changeCurrentCurrency = (disptach) => async (currency) => {
  await AsyncStorage.setItem('currency', JSON.stringify(currency));

  disptach({ type: 'change_current_currency', payload: currency });
};

const getCurrentCurrency = (dispatch) => async () => {
  const unparsedCurrency = await AsyncStorage.getItem('currency');
  if (unparsedCurrency !== null && unparsedCurrency !== undefined) {
    const parsedCurrency = JSON.parse(unparsedCurrency);
    dispatch({ type: 'change_current_currency', payload: parsedCurrency });
  } else {
    dispatch({
      type: 'change_current_currency',
      payload: {
        currency_iso: 'RON',
        currency_name: 'Romanian leu',
        rate: 1
      }
    });
  }
};

export const { Context, Provider } = createDataContext(
  userReducer,
  {
    addCurrencies,
    addUserRating,
    changeCurrentCurrency,
    getCurrentCurrency,
    getUserRating,
    addUserLocation,
    addUserLocationError,
    checkIsFirstTime,
    setValueIsFirstTime
  },
  {
    userLocation: '',
    errorUserLocation: '',
    isFirstTime: true,
    errorMessage: '',
    userRating: 0,
    currencies: [],
    currentCurrency: null
  }
);
