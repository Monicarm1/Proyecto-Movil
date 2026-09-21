// Puestos del Mercado de Pulgas San Alejo
// ViewBox: 0 0 2100 1000
// Grilla: 40x30 con gap de 2px

export const PUESTOS_BASE = [
  // =====================================================
  // FILA SUPERIOR (46A → 30)
  // Empieza alineada con el 47 (columna vertical)
  // y=5, x desde 640 hasta 1342
  // =====================================================
  { numero: '46A', x: 640,  y: 5, ancho: 40, alto: 30 },
  { numero: '46',  x: 682,  y: 5, ancho: 40, alto: 30 },
  { numero: '45',  x: 724,  y: 5, ancho: 40, alto: 30 },
  { numero: '44',  x: 766,  y: 5, ancho: 40, alto: 30 },
  { numero: '43',  x: 808,  y: 5, ancho: 40, alto: 30 },
  { numero: '42',  x: 850,  y: 5, ancho: 40, alto: 30 },
  { numero: '41',  x: 892,  y: 5, ancho: 40, alto: 30 },
  { numero: '40',  x: 934,  y: 5, ancho: 40, alto: 30 },
  { numero: '39',  x: 976,  y: 5, ancho: 40, alto: 30 },
  { numero: '38',  x: 1018, y: 5, ancho: 40, alto: 30 },
  { numero: '37',  x: 1060, y: 5, ancho: 40, alto: 30 },
  { numero: '36',  x: 1102, y: 5, ancho: 40, alto: 30 },
  { numero: '35',  x: 1144, y: 5, ancho: 40, alto: 30 },
  { numero: '34',  x: 1186, y: 5, ancho: 40, alto: 30 },
  { numero: '33',  x: 1228, y: 5, ancho: 40, alto: 30 },
  { numero: '32',  x: 1270, y: 5, ancho: 40, alto: 30 },
  { numero: '31',  x: 1312, y: 5, ancho: 40, alto: 30 },
  { numero: '30',  x: 1354, y: 5, ancho: 40, alto: 30 },

  // =====================================================
  // COLUMNA 47-52 (debajo de 46A, misma x=640)
  // =====================================================
  { numero: '47', x: 640, y: 37,  ancho: 40, alto: 30 },
  { numero: '48', x: 640, y: 69,  ancho: 40, alto: 30 },
  { numero: '49', x: 640, y: 101, ancho: 40, alto: 30 },
  { numero: '50', x: 640, y: 133, ancho: 40, alto: 30 },
  { numero: '51', x: 640, y: 165, ancho: 40, alto: 30 },
  { numero: '52', x: 640, y: 197, ancho: 40, alto: 30 },

  // =====================================================
  // FILA 65 → 53 (horizontal, al lado izquierdo del 52)
  // y=197, el 53 va pegado al 52 (x=598)
  // La fila va desde x=94 hasta x=598
  // =====================================================
  { numero: '65', x: 94,  y: 197, ancho: 40, alto: 30 },
  { numero: '64', x: 136, y: 197, ancho: 40, alto: 30 },
  { numero: '63', x: 178, y: 197, ancho: 40, alto: 30 },
  { numero: '62', x: 220, y: 197, ancho: 40, alto: 30 },
  { numero: '61', x: 262, y: 197, ancho: 40, alto: 30 },
  { numero: '60', x: 304, y: 197, ancho: 40, alto: 30 },
  { numero: '59', x: 346, y: 197, ancho: 40, alto: 30 },
  { numero: '58', x: 388, y: 197, ancho: 40, alto: 30 },
  { numero: '57', x: 430, y: 197, ancho: 40, alto: 30 },
  { numero: '56', x: 472, y: 197, ancho: 40, alto: 30 },
  { numero: '55', x: 514, y: 197, ancho: 40, alto: 30 },
  { numero: '54', x: 556, y: 197, ancho: 40, alto: 30 },
  { numero: '53', x: 598, y: 197, ancho: 40, alto: 30 },

  // =====================================================
  // COLUMNA 29 → 25 (esquina inferior derecha del 30)
  // El 30 está en x=1354, y=5
  // El 29 va debajo del 30 (x=1354, y=37)
  // =====================================================
  { numero: '29', x: 1354, y: 37,  ancho: 40, alto: 30 },
  { numero: '28', x: 1354, y: 69,  ancho: 40, alto: 30 },
  { numero: '27', x: 1354, y: 101, ancho: 40, alto: 30 },
  { numero: '26', x: 1354, y: 133, ancho: 40, alto: 30 },
  { numero: '25', x: 1354, y: 165, ancho: 40, alto: 30 },
  // ASEO y 24 van a la derecha del 25
  { numero: '24', x: 1440, y: 165, ancho: 40, alto: 30 },

  // =====================================================
  // COLUMNA IZQUIERDA 66, 67, 88, 89, 115, 138, 141
  // Pegada al borde izquierdo, debajo del 65 (x=94)
  // =====================================================
  { numero: '66',  x: 94, y: 229, ancho: 40, alto: 30 },
  { numero: '67',  x: 94, y: 261, ancho: 40, alto: 30 },
  { numero: '88',  x: 94, y: 293, ancho: 40, alto: 30 },
  { numero: '89',  x: 94, y: 325, ancho: 40, alto: 30 },
  { numero: '115', x: 94, y: 417, ancho: 40, alto: 30 },
  { numero: '138', x: 94, y: 449, ancho: 40, alto: 30 },
  { numero: '141', x: 94, y: 481, ancho: 40, alto: 30 },

  // =====================================================
  // FILA 68-77 (y=261, empieza en x=178 después del 67)
  // =====================================================
  { numero: '68',  x: 178, y: 261, ancho: 40, alto: 30 },
  { numero: '69',  x: 220, y: 261, ancho: 40, alto: 30 },
  { numero: '70',  x: 262, y: 261, ancho: 40, alto: 30 },
  { numero: '71',  x: 304, y: 261, ancho: 40, alto: 30 },
  { numero: '72',  x: 346, y: 261, ancho: 40, alto: 30 },
  { numero: '73',  x: 388, y: 261, ancho: 40, alto: 30 },
  { numero: '73b', x: 430, y: 261, ancho: 40, alto: 30 },
  { numero: '74',  x: 472, y: 261, ancho: 40, alto: 30 },
  { numero: '75',  x: 514, y: 261, ancho: 40, alto: 30 },
  { numero: '76',  x: 556, y: 261, ancho: 40, alto: 30 },
  { numero: '77',  x: 598, y: 261, ancho: 40, alto: 30 },

  // =====================================================
  // FILA 87-78 (y=293)
  // =====================================================
  { numero: '87',  x: 178, y: 293, ancho: 40, alto: 30 },
  { numero: '86',  x: 220, y: 293, ancho: 40, alto: 30 },
  { numero: '85',  x: 262, y: 293, ancho: 40, alto: 30 },
  { numero: '84b', x: 304, y: 293, ancho: 40, alto: 30 },
  { numero: '84',  x: 346, y: 293, ancho: 40, alto: 30 },
  { numero: '83',  x: 388, y: 293, ancho: 40, alto: 30 },
  { numero: '82',  x: 430, y: 293, ancho: 40, alto: 30 },
  { numero: '81',  x: 472, y: 293, ancho: 40, alto: 30 },
  { numero: '80',  x: 514, y: 293, ancho: 40, alto: 30 },
  { numero: '79',  x: 556, y: 293, ancho: 40, alto: 30 },
  { numero: '78',  x: 598, y: 293, ancho: 40, alto: 30 },

  // =====================================================
  // FILA 90-101 (y=361)
  // =====================================================
  { numero: '90',  x: 94,  y: 361, ancho: 40, alto: 30 },
  { numero: '91',  x: 136, y: 361, ancho: 40, alto: 30 },
  { numero: '92',  x: 178, y: 361, ancho: 40, alto: 30 },
  { numero: '93',  x: 220, y: 361, ancho: 40, alto: 30 },
  { numero: '94',  x: 262, y: 361, ancho: 40, alto: 30 },
  { numero: '95',  x: 304, y: 361, ancho: 40, alto: 30 },
  { numero: '96',  x: 346, y: 361, ancho: 40, alto: 30 },
  { numero: '97',  x: 388, y: 361, ancho: 40, alto: 30 },
  { numero: '98',  x: 430, y: 361, ancho: 40, alto: 30 },
  { numero: '99',  x: 472, y: 361, ancho: 40, alto: 30 },
  { numero: '100', x: 514, y: 361, ancho: 40, alto: 30 },
  { numero: '101', x: 556, y: 361, ancho: 40, alto: 30 },

  // =====================================================
  // FILA 114-102 (y=393)
  // =====================================================
  { numero: '114', x: 94,  y: 393, ancho: 40, alto: 30 },
  { numero: '113', x: 136, y: 393, ancho: 40, alto: 30 },
  { numero: '112', x: 178, y: 393, ancho: 40, alto: 30 },
  { numero: '111', x: 220, y: 393, ancho: 40, alto: 30 },
  { numero: '110', x: 262, y: 393, ancho: 40, alto: 30 },
  { numero: '109', x: 304, y: 393, ancho: 40, alto: 30 },
  { numero: '108', x: 346, y: 393, ancho: 40, alto: 30 },
  { numero: '107', x: 388, y: 393, ancho: 40, alto: 30 },
  { numero: '106', x: 430, y: 393, ancho: 40, alto: 30 },
  { numero: '105', x: 472, y: 393, ancho: 40, alto: 30 },
  { numero: '104', x: 514, y: 393, ancho: 40, alto: 30 },
  { numero: '103', x: 556, y: 393, ancho: 40, alto: 30 },
  { numero: '102', x: 598, y: 393, ancho: 40, alto: 30 },

  // =====================================================
  // FILA 116-126 (y=457)
  // =====================================================
  { numero: '116', x: 178, y: 457, ancho: 40, alto: 30 },
  { numero: '117', x: 220, y: 457, ancho: 40, alto: 30 },
  { numero: '118', x: 262, y: 457, ancho: 40, alto: 30 },
  { numero: '119', x: 304, y: 457, ancho: 40, alto: 30 },
  { numero: '120', x: 346, y: 457, ancho: 40, alto: 30 },
  { numero: '121', x: 388, y: 457, ancho: 40, alto: 30 },
  { numero: '122', x: 430, y: 457, ancho: 40, alto: 30 },
  { numero: '123', x: 472, y: 457, ancho: 40, alto: 30 },
  { numero: '124', x: 514, y: 457, ancho: 40, alto: 30 },
  { numero: '125', x: 556, y: 457, ancho: 40, alto: 30 },
  { numero: '126', x: 598, y: 457, ancho: 40, alto: 30 },

  // =====================================================
  // FILA 137-127 (y=489)
  // =====================================================
  { numero: '137', x: 178, y: 489, ancho: 40, alto: 30 },
  { numero: '136', x: 220, y: 489, ancho: 40, alto: 30 },
  { numero: '135', x: 262, y: 489, ancho: 40, alto: 30 },
  { numero: '134', x: 304, y: 489, ancho: 40, alto: 30 },
  { numero: '133', x: 346, y: 489, ancho: 40, alto: 30 },
  { numero: '132', x: 388, y: 489, ancho: 40, alto: 30 },
  { numero: '131', x: 430, y: 489, ancho: 40, alto: 30 },
  { numero: '130', x: 472, y: 489, ancho: 40, alto: 30 },
  { numero: '129', x: 514, y: 489, ancho: 40, alto: 30 },
  { numero: '128', x: 556, y: 489, ancho: 40, alto: 30 },
  { numero: '127', x: 598, y: 489, ancho: 40, alto: 30 },

  // =====================================================
  // FILA 139-152 (y=553)
  // =====================================================
  { numero: '139', x: 94,  y: 553, ancho: 40, alto: 30 },
  { numero: '140', x: 136, y: 553, ancho: 40, alto: 30 },
  { numero: '142', x: 178, y: 553, ancho: 40, alto: 30 },
  { numero: '143', x: 220, y: 553, ancho: 40, alto: 30 },
  { numero: '144', x: 262, y: 553, ancho: 40, alto: 30 },
  { numero: '145', x: 304, y: 553, ancho: 40, alto: 30 },
  { numero: '146', x: 346, y: 553, ancho: 40, alto: 30 },
  { numero: '147', x: 388, y: 553, ancho: 40, alto: 30 },
  { numero: '148', x: 430, y: 553, ancho: 40, alto: 30 },
  { numero: '149', x: 472, y: 553, ancho: 40, alto: 30 },
  { numero: '150', x: 514, y: 553, ancho: 40, alto: 30 },
  { numero: '151', x: 556, y: 553, ancho: 40, alto: 30 },
  { numero: '152', x: 598, y: 553, ancho: 40, alto: 30 },

  // =====================================================
  // BLOQUES CENTRALES SUPERIORES (y=90)
  // Columna izquierda en x=750, columna derecha en x=792
  // =====================================================
  // Bloque 160-163 / 197-194
  { numero: '160', x: 750, y: 90, ancho: 40, alto: 30 },
  { numero: '161', x: 750, y: 122, ancho: 40, alto: 30 },
  { numero: '162', x: 750, y: 154, ancho: 40, alto: 30 },
  { numero: '163', x: 750, y: 186, ancho: 40, alto: 30 },
  { numero: '197', x: 792, y: 90, ancho: 40, alto: 30 },
  { numero: '196', x: 792, y: 122, ancho: 40, alto: 30 },
  { numero: '195', x: 792, y: 154, ancho: 40, alto: 30 },
  { numero: '194', x: 792, y: 186, ancho: 40, alto: 30 },

  // Bloque 198-201 / 235-232
  { numero: '198', x: 900, y: 90, ancho: 40, alto: 30 },
  { numero: '199', x: 900, y: 122, ancho: 40, alto: 30 },
  { numero: '200', x: 900, y: 154, ancho: 40, alto: 30 },
  { numero: '201', x: 900, y: 186, ancho: 40, alto: 30 },
  { numero: '235', x: 942, y: 90, ancho: 40, alto: 30 },
  { numero: '234', x: 942, y: 122, ancho: 40, alto: 30 },
  { numero: '233', x: 942, y: 154, ancho: 40, alto: 30 },
  { numero: '232', x: 942, y: 186, ancho: 40, alto: 30 },

  // Bloque 236-239 / 273-270
  { numero: '236', x: 1050, y: 90, ancho: 40, alto: 30 },
  { numero: '237', x: 1050, y: 122, ancho: 40, alto: 30 },
  { numero: '238', x: 1050, y: 154, ancho: 40, alto: 30 },
  { numero: '239', x: 1050, y: 186, ancho: 40, alto: 30 },
  { numero: '273', x: 1092, y: 90, ancho: 40, alto: 30 },
  { numero: '272', x: 1092, y: 122, ancho: 40, alto: 30 },
  { numero: '271', x: 1092, y: 154, ancho: 40, alto: 30 },
  { numero: '270', x: 1092, y: 186, ancho: 40, alto: 30 },

  // Bloque 274-277 / 311-308
  { numero: '274', x: 1200, y: 90, ancho: 40, alto: 30 },
  { numero: '275', x: 1200, y: 122, ancho: 40, alto: 30 },
  { numero: '276', x: 1200, y: 154, ancho: 40, alto: 30 },
  { numero: '277', x: 1200, y: 186, ancho: 40, alto: 30 },
  { numero: '311', x: 1242, y: 90, ancho: 40, alto: 30 },
  { numero: '310', x: 1242, y: 122, ancho: 40, alto: 30 },
  { numero: '309', x: 1242, y: 154, ancho: 40, alto: 30 },
  { numero: '308', x: 1242, y: 186, ancho: 40, alto: 30 },

  // Bloque 312-315 / 331-328
  { numero: '312', x: 1350, y: 90, ancho: 40, alto: 30 },
  { numero: '313', x: 1350, y: 122, ancho: 40, alto: 30 },
  { numero: '314', x: 1350, y: 154, ancho: 40, alto: 30 },
  { numero: '315', x: 1350, y: 186, ancho: 40, alto: 30 },
  { numero: '331', x: 1392, y: 90, ancho: 40, alto: 30 },
  { numero: '330', x: 1392, y: 122, ancho: 40, alto: 30 },
  { numero: '329', x: 1392, y: 154, ancho: 40, alto: 30 },
  { numero: '328', x: 1392, y: 186, ancho: 40, alto: 30 },

  // =====================================================
  // BLOQUES CENTRALES MEDIOS (y=261)
  // =====================================================
  // Bloque 164-168 / 193-189
  { numero: '164', x: 750, y: 261, ancho: 40, alto: 30 },
  { numero: '165', x: 750, y: 293, ancho: 40, alto: 30 },
  { numero: '166', x: 750, y: 325, ancho: 40, alto: 30 },
  { numero: '167', x: 750, y: 357, ancho: 40, alto: 30 },
  { numero: '168', x: 750, y: 389, ancho: 40, alto: 30 },
  { numero: '193', x: 792, y: 261, ancho: 40, alto: 30 },
  { numero: '192', x: 792, y: 293, ancho: 40, alto: 30 },
  { numero: '191', x: 792, y: 325, ancho: 40, alto: 30 },
  { numero: '190', x: 792, y: 357, ancho: 40, alto: 30 },
  { numero: '189', x: 792, y: 389, ancho: 40, alto: 30 },

  // Bloque 202-206 / 231-227
  { numero: '202', x: 900, y: 261, ancho: 40, alto: 30 },
  { numero: '203', x: 900, y: 293, ancho: 40, alto: 30 },
  { numero: '204', x: 900, y: 325, ancho: 40, alto: 30 },
  { numero: '205', x: 900, y: 357, ancho: 40, alto: 30 },
  { numero: '206', x: 900, y: 389, ancho: 40, alto: 30 },
  { numero: '231', x: 942, y: 261, ancho: 40, alto: 30 },
  { numero: '230', x: 942, y: 293, ancho: 40, alto: 30 },
  { numero: '229', x: 942, y: 325, ancho: 40, alto: 30 },
  { numero: '228', x: 942, y: 357, ancho: 40, alto: 30 },
  { numero: '227', x: 942, y: 389, ancho: 40, alto: 30 },

  // Bloque 240-244 / 269-265
  { numero: '240', x: 1050, y: 261, ancho: 40, alto: 30 },
  { numero: '241', x: 1050, y: 293, ancho: 40, alto: 30 },
  { numero: '242', x: 1050, y: 325, ancho: 40, alto: 30 },
  { numero: '243', x: 1050, y: 357, ancho: 40, alto: 30 },
  { numero: '244', x: 1050, y: 389, ancho: 40, alto: 30 },
  { numero: '269', x: 1092, y: 261, ancho: 40, alto: 30 },
  { numero: '268', x: 1092, y: 293, ancho: 40, alto: 30 },
  { numero: '267', x: 1092, y: 325, ancho: 40, alto: 30 },
  { numero: '266', x: 1092, y: 357, ancho: 40, alto: 30 },
  { numero: '265', x: 1092, y: 389, ancho: 40, alto: 30 },

  // Bloque 278-282 / 307-303
  { numero: '278', x: 1200, y: 261, ancho: 40, alto: 30 },
  { numero: '279', x: 1200, y: 293, ancho: 40, alto: 30 },
  { numero: '280', x: 1200, y: 325, ancho: 40, alto: 30 },
  { numero: '281', x: 1200, y: 357, ancho: 40, alto: 30 },
  { numero: '282', x: 1200, y: 389, ancho: 40, alto: 30 },
  { numero: '307', x: 1242, y: 261, ancho: 40, alto: 30 },
  { numero: '306', x: 1242, y: 293, ancho: 40, alto: 30 },
  { numero: '305', x: 1242, y: 325, ancho: 40, alto: 30 },
  { numero: '304', x: 1242, y: 357, ancho: 40, alto: 30 },
  { numero: '303', x: 1242, y: 389, ancho: 40, alto: 30 },

  // =====================================================
  // BLOQUE 316-321 / 327-322 (ALINEADO DEBAJO DEL 315/328)
  // El 315 está en x=1350, y=186
  // El 316 va DEBAJO del 315 (x=1350, y=261)
  // El 328 está en x=1392, y=186
  // El 327 va DEBAJO del 328 (x=1392, y=261)
  // =====================================================
  { numero: '316', x: 1350, y: 261, ancho: 40, alto: 30 },
  { numero: '317', x: 1350, y: 293, ancho: 40, alto: 30 },
  { numero: '318', x: 1350, y: 325, ancho: 40, alto: 30 },
  { numero: '319', x: 1350, y: 357, ancho: 40, alto: 30 },
  { numero: '320', x: 1350, y: 389, ancho: 40, alto: 30 },
  { numero: '321', x: 1350, y: 421, ancho: 40, alto: 30 },
  { numero: '327', x: 1392, y: 261, ancho: 40, alto: 30 },
  { numero: '326', x: 1392, y: 293, ancho: 40, alto: 30 },
  { numero: '325', x: 1392, y: 325, ancho: 40, alto: 30 },
  { numero: '324', x: 1392, y: 357, ancho: 40, alto: 30 },
  { numero: '323', x: 1392, y: 389, ancho: 40, alto: 30 },
  { numero: '322', x: 1392, y: 421, ancho: 40, alto: 30 },

  // =====================================================
  // BLOQUE 336-341 / 347-342
  // =====================================================
  { numero: '336', x: 1470, y: 261, ancho: 40, alto: 30 },
  { numero: '337', x: 1470, y: 293, ancho: 40, alto: 30 },
  { numero: '338', x: 1470, y: 325, ancho: 40, alto: 30 },
  { numero: '339', x: 1470, y: 357, ancho: 40, alto: 30 },
  { numero: '340', x: 1470, y: 389, ancho: 40, alto: 30 },
  { numero: '341', x: 1470, y: 421, ancho: 40, alto: 30 },
  { numero: '347', x: 1512, y: 261, ancho: 40, alto: 30 },
  { numero: '346', x: 1512, y: 293, ancho: 40, alto: 30 },
  { numero: '345', x: 1512, y: 325, ancho: 40, alto: 30 },
  { numero: '344', x: 1512, y: 357, ancho: 40, alto: 30 },
  { numero: '343', x: 1512, y: 389, ancho: 40, alto: 30 },
  { numero: '342', x: 1512, y: 421, ancho: 40, alto: 30 },

  // =====================================================
  // COLUMNA 23-17 (derecha)
  // =====================================================
  { numero: '23', x: 1590, y: 261, ancho: 40, alto: 30 },
  { numero: '22', x: 1590, y: 293, ancho: 40, alto: 30 },
  { numero: '21', x: 1590, y: 325, ancho: 40, alto: 30 },
  { numero: '20', x: 1590, y: 357, ancho: 40, alto: 30 },
  { numero: '19', x: 1590, y: 389, ancho: 40, alto: 30 },
  { numero: '18', x: 1590, y: 421, ancho: 40, alto: 30 },
  { numero: '17', x: 1590, y: 453, ancho: 40, alto: 30 },

  // =====================================================
  // FILA 11-16 / B (y=489, alineada debajo del bloque 316-322)
  // =====================================================
  { numero: '11', x: 1230, y: 489, ancho: 40, alto: 30 },
  { numero: '12', x: 1272, y: 489, ancho: 40, alto: 30 },
  { numero: '13', x: 1314, y: 489, ancho: 40, alto: 30 },
  { numero: '14', x: 1356, y: 489, ancho: 40, alto: 30 },
  { numero: '15', x: 1398, y: 489, ancho: 40, alto: 30 },
  { numero: '16', x: 1440, y: 489, ancho: 40, alto: 30 },
  { numero: 'B',  x: 1482, y: 489, ancho: 40, alto: 30 },

  // =====================================================
  // COLUMNA 10-1 (derecha, alineada con 11-16)
  // =====================================================
  { numero: '10', x: 1230, y: 521, ancho: 40, alto: 30 },
  { numero: '9',  x: 1230, y: 553, ancho: 40, alto: 30 },
  { numero: '8',  x: 1230, y: 585, ancho: 40, alto: 30 },
  { numero: '7',  x: 1230, y: 617, ancho: 40, alto: 30 },
  { numero: '6',  x: 1230, y: 649, ancho: 40, alto: 30 },
  { numero: '5',  x: 1230, y: 681, ancho: 40, alto: 30 },
  { numero: '4',  x: 1230, y: 713, ancho: 40, alto: 30 },
  { numero: '3',  x: 1230, y: 745, ancho: 40, alto: 30 },
  { numero: '2',  x: 1230, y: 810, ancho: 40, alto: 30 },
  { numero: '1',  x: 1230, y: 842, ancho: 40, alto: 30 },

  // =====================================================
  // BLOQUES CENTRALES INFERIORES (y=497)
  // =====================================================
  // Bloque 169-178 / 188-179
  { numero: '169', x: 750, y: 497, ancho: 40, alto: 30 },
  { numero: '170', x: 750, y: 529, ancho: 40, alto: 30 },
  { numero: '171', x: 750, y: 561, ancho: 40, alto: 30 },
  { numero: '172', x: 750, y: 593, ancho: 40, alto: 30 },
  { numero: '173', x: 750, y: 625, ancho: 40, alto: 30 },
  { numero: '174', x: 750, y: 657, ancho: 40, alto: 30 },
  { numero: '175', x: 750, y: 689, ancho: 40, alto: 30 },
  { numero: '176', x: 750, y: 721, ancho: 40, alto: 30 },
  { numero: '177', x: 750, y: 753, ancho: 40, alto: 30 },
  { numero: '178', x: 750, y: 785, ancho: 40, alto: 30 },
  { numero: '188', x: 792, y: 497, ancho: 40, alto: 30 },
  { numero: '187', x: 792, y: 529, ancho: 40, alto: 30 },
  { numero: '186', x: 792, y: 561, ancho: 40, alto: 30 },
  { numero: '185', x: 792, y: 593, ancho: 40, alto: 30 },
  { numero: '184', x: 792, y: 625, ancho: 40, alto: 30 },
  { numero: '183', x: 792, y: 657, ancho: 40, alto: 30 },
  { numero: '182', x: 792, y: 689, ancho: 40, alto: 30 },
  { numero: '181', x: 792, y: 721, ancho: 40, alto: 30 },
  { numero: '180', x: 792, y: 753, ancho: 40, alto: 30 },
  { numero: '179', x: 792, y: 785, ancho: 40, alto: 30 },

  // Bloque 207-216 / 226-217
  { numero: '207', x: 900, y: 497, ancho: 40, alto: 30 },
  { numero: '208', x: 900, y: 529, ancho: 40, alto: 30 },
  { numero: '209', x: 900, y: 561, ancho: 40, alto: 30 },
  { numero: '210', x: 900, y: 593, ancho: 40, alto: 30 },
  { numero: '211', x: 900, y: 625, ancho: 40, alto: 30 },
  { numero: '212', x: 900, y: 657, ancho: 40, alto: 30 },
  { numero: '213', x: 900, y: 689, ancho: 40, alto: 30 },
  { numero: '214', x: 900, y: 721, ancho: 40, alto: 30 },
  { numero: '215', x: 900, y: 753, ancho: 40, alto: 30 },
  { numero: '216', x: 900, y: 785, ancho: 40, alto: 30 },
  { numero: '226', x: 942, y: 497, ancho: 40, alto: 30 },
  { numero: '225', x: 942, y: 529, ancho: 40, alto: 30 },
  { numero: '224', x: 942, y: 561, ancho: 40, alto: 30 },
  { numero: '223', x: 942, y: 593, ancho: 40, alto: 30 },
  { numero: '222', x: 942, y: 625, ancho: 40, alto: 30 },
  { numero: '221', x: 942, y: 657, ancho: 40, alto: 30 },
  { numero: '220', x: 942, y: 689, ancho: 40, alto: 30 },
  { numero: '219', x: 942, y: 721, ancho: 40, alto: 30 },
  { numero: '218', x: 942, y: 753, ancho: 40, alto: 30 },
  { numero: '217', x: 942, y: 785, ancho: 40, alto: 30 },

  // Bloque 245-254 / 264-255
  { numero: '245', x: 1050, y: 497, ancho: 40, alto: 30 },
  { numero: '246', x: 1050, y: 529, ancho: 40, alto: 30 },
  { numero: '247', x: 1050, y: 561, ancho: 40, alto: 30 },
  { numero: '248', x: 1050, y: 593, ancho: 40, alto: 30 },
  { numero: '249', x: 1050, y: 625, ancho: 40, alto: 30 },
  { numero: '250', x: 1050, y: 657, ancho: 40, alto: 30 },
  { numero: '251', x: 1050, y: 689, ancho: 40, alto: 30 },
  { numero: '252', x: 1050, y: 721, ancho: 40, alto: 30 },
  { numero: '253', x: 1050, y: 753, ancho: 40, alto: 30 },
  { numero: '254', x: 1050, y: 785, ancho: 40, alto: 30 },
  { numero: '264', x: 1092, y: 497, ancho: 40, alto: 30 },
  { numero: '263', x: 1092, y: 529, ancho: 40, alto: 30 },
  { numero: '262', x: 1092, y: 561, ancho: 40, alto: 30 },
  { numero: '261', x: 1092, y: 593, ancho: 40, alto: 30 },
  { numero: '260', x: 1092, y: 625, ancho: 40, alto: 30 },
  { numero: '259', x: 1092, y: 657, ancho: 40, alto: 30 },
  { numero: '258', x: 1092, y: 689, ancho: 40, alto: 30 },
  { numero: '257', x: 1092, y: 721, ancho: 40, alto: 30 },
  { numero: '256', x: 1092, y: 753, ancho: 40, alto: 30 },
  { numero: '255', x: 1092, y: 785, ancho: 40, alto: 30 },

  // Bloque 283-292 / 302-293
  { numero: '283', x: 1200, y: 497, ancho: 40, alto: 30 },
  { numero: '284', x: 1200, y: 529, ancho: 40, alto: 30 },
  { numero: '285', x: 1200, y: 561, ancho: 40, alto: 30 },
  { numero: '286', x: 1200, y: 593, ancho: 40, alto: 30 },
  { numero: '287', x: 1200, y: 625, ancho: 40, alto: 30 },
  { numero: '288', x: 1200, y: 657, ancho: 40, alto: 30 },
  { numero: '289', x: 1200, y: 689, ancho: 40, alto: 30 },
  { numero: '290', x: 1200, y: 721, ancho: 40, alto: 30 },
  { numero: '291', x: 1200, y: 753, ancho: 40, alto: 30 },
  { numero: '292', x: 1200, y: 785, ancho: 40, alto: 30 },
  { numero: '302', x: 1242, y: 497, ancho: 40, alto: 30 },
  { numero: '301', x: 1242, y: 529, ancho: 40, alto: 30 },
  { numero: '300', x: 1242, y: 561, ancho: 40, alto: 30 },
  { numero: '299', x: 1242, y: 593, ancho: 40, alto: 30 },
  { numero: '298', x: 1242, y: 625, ancho: 40, alto: 30 },
  { numero: '297', x: 1242, y: 657, ancho: 40, alto: 30 },
  { numero: '296', x: 1242, y: 689, ancho: 40, alto: 30 },
  { numero: '295', x: 1242, y: 721, ancho: 40, alto: 30 },
  { numero: '294', x: 1242, y: 753, ancho: 40, alto: 30 },
  { numero: '293', x: 1242, y: 785, ancho: 40, alto: 30 },

  // =====================================================
  // ZONA INFERIOR CENTRAL
  // =====================================================
  { numero: '153', x: 598, y: 617, ancho: 40, alto: 30 },
  { numero: '154', x: 598, y: 777, ancho: 40, alto: 30 },
  { numero: '155', x: 598, y: 809, ancho: 40, alto: 30 },
  { numero: '156', x: 598, y: 841, ancho: 40, alto: 30 },
  { numero: '157', x: 660, y: 873, ancho: 40, alto: 30 },
  { numero: '158', x: 702, y: 873, ancho: 40, alto: 30 },
  { numero: '159', x: 750, y: 905, ancho: 40, alto: 30 },

  // FILA 351-348
  { numero: '351', x: 960, y: 905, ancho: 40, alto: 30 },
  { numero: '350', x: 1002, y: 905, ancho: 40, alto: 30 },
  { numero: '349', x: 1044, y: 905, ancho: 40, alto: 30 },
  { numero: '348', x: 1086, y: 905, ancho: 40, alto: 30 },

  // FILA 332-335
  { numero: '332', x: 1230, y: 931, ancho: 40, alto: 30 },
  { numero: '333', x: 1272, y: 931, ancho: 40, alto: 30 },
  { numero: '334', x: 1314, y: 931, ancho: 40, alto: 30 },
  { numero: '335', x: 1356, y: 931, ancho: 40, alto: 30 },

  // PUESTO 352
  { numero: '352', x: 750, y: 937, ancho: 40, alto: 30 },
];