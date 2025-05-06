const fileID = "1WvyolHkQcWN91jqd5zEF7S_lWG-pvDV4pjItVnWG5j4";
const SS = SpreadsheetApp.openById(fileID);
const movimientos = SS.getSheetByName('Movimientos');
const consultasDB = SS.getSheetByName('ConsultasDB');
const balances = SS.getSheetByName('Balance');