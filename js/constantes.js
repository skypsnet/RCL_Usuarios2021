// ============== CONSTANTES DE USO GLOBAL =====================

const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();
const database = firebase.database();
const $$ = Dom7;
const mainView = app.views.create('.view-main',{
    preloadPreviousPage: false,
    }); 
let statusescaner = false;
let contadorpagina = 0;
let contadorpagina1 = 0;
let items = [];
let datoscupon = [];
let statusinfo = false;
let itemspromo = [];

// ============================================================
