import axios from 'axios';
import fs from 'fs/promises';

const CUSTOM_URL = "http://localhost/"
// "https://fakestoreapi.com/products/1"
axios.get(CUSTOM_URL)
    .then(res => res.data)
    .catch(er => console.log(er))


