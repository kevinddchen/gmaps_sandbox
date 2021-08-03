/**
 * Put all building metadata here.
 */
const meta = [
  {
    position: {lat: 42.37332110955503, lng: -71.1173080878118},
    title: 'Boylston Hall',
    sid: 'VrJDKwnJc9Q',
    description: `Boylston Hall is a Harvard University classroom and academic office building lecture hall near \
    the southwest corner of Harvard Yard. Boylston Hall was gut renovated in 1959 by the architectural firm of \
    Benjamin Thompson and Associates, and is considered an early example of the reuse of sound old buildings, \
    juxtaposing glass and steel with historic details. It houses the offices of the Harvard Classics Department.`
  },
  {
    position: { lat: 42.37563007285733, lng: -71.11323291791693 }, 
    title: 'Center for Government and International Studies',
    sid: 'FXNqoAZ3SHA',
    description: 'The Center for Government and International Studies unites the Government Department, faculty of the History Department who have international research interests, and many of the international research centers in the Faculty of Arts and Sciences at Harvard. \
    The complex is designed to promote lively, interdisciplinary exchange among faculty, students, and visitors from around the world.'
  },
  {
    position: { lat: 42.37484391141072, lng: -71.11823573681987 }, 
    title: 'Harvard Hall',
    sid: 'DhGGdYSxAXN',
    description: 'The present Harvard Hall replaces an earlier structure of the same name on the same site. The first Harvard Hall was built between 1674 and 1677. It was Harvard College first brick building and replaced a decaying wooden building located a few hundred feet to the\
     southeast. Samuel Andrew, a local Cambridge merchant and shipwright was the master builder'
  },
  {
    position: {lat: 42.378067593808055, lng: -71.11394352511542},
    title: 'Harvard Museum of the Ancient Near East',
    sid: 'bS17YNKCggy',
    description: 'Founded in 1889, the museum was conceived as a teaching tool to study the ancient histories and cultures of people who spoke Semitic languages, among them Israelites, Moabites, Arabs, Babylonians, and Phoenicians.\
    The museum’s focus remains on the wide variety of diverse peoples living in the eastern Mediterranean region, parts of modern-day Iraq, and even of north Africa, including the Egyptians, Assyrians, Hittites, and Philistines.'
  },
  {
    position: {lat: 42.374549798221835, lng: -71.11751626811608},
    title: 'Harvard Yard #1',
    sid: 'wT8ojX6z8AV',
    description: `Harvard Yard is the oldest part of the Harvard University campus, its historic center and modern \ 
    crossroads. It contains most of the freshman dormitories, Harvard's most important libraries, Memorial Church, \
    several classroom and departmental buildings, and the offices of senior University officials including the \
    President of Harvard University.`
  },
  {
    position: {lat: 42.374334531799576, lng: -71.11621825826947},
    title: 'Harvard Yard #2',
    sid: 'JuCBHmeY7o7',
    description: `The center of the Yard, known as Tercentenary Theatre, is a wide grassy area bounded by Widener 
    Library, Memorial Church, University Hall, and Sever Hall. Tercentenary Theatre is the site of annual \
    commencement exercises and other convocations.`
  },
  {
    position: {lat: 42.376408756832326, lng: -71.1182500494466},
    title: 'Littauer Center of Public Administration',
    sid: '7NHGxdB7qDi',
    description: 'CAMBRIDGE, Mass., Dec. 2--In a building, the newness of whose white granite facade shines in the wintry sunlight, the Harvard Graduate School of Public Administration goes into its academic year for the first time in the new Littauer Center of Public Administration',
  },
  {
    position: { lat: 42.37122944321476, lng: -71.11819167299701 }, 
    title: 'Lowell House',
    sid: 'Gb7TzfTuCoV',
    description: 'Lowell House is one of twelve undergraduate residential Houses at Harvard University, located at 10 Holyoke Place facing Mount Auburn Street between Harvard Yard and the Charles River. \
    Lowell House is simultaneously close to the Yard, Harvard Square, and other Harvard "River" houses, and its blue-capped bell tower, visible for many miles, is a local landmark.'
  },
  {
    position: {lat: 42.37618008393806, lng: -71.11623340853427},
    title:'Nivola Mural',
    sid:'YzKLDBrBojF',
    description:`Originally created by celebrated sculptor Costantino Nivola for the Manhattan \
    showroom of Italian business machine manufacturer Olivetti, this bas-relief \
    represents a unique achievement in artistic technology.`
  },
  {
    position: { lat: 42.37471210920963, lng: -71.11494780740425 }, 
    title: 'Robinson Hall',
    sid: 'GycExKiYVFp',
    description: 'Harvard has finished an eight-month renovation of Robinson Hall, the building housing the History Department, according to Associate Dean for Physical Resources and Planning Michael N. Lichten.'
  },
  {
    position: {lat: 42.37568868407961, lng: -71.11650967606187},
    title:'Science Center Courtyard',
    sid:'i6ZvCMyzCsf',
    description: `The plaza between the Science Center and Harvard Yard, created by the depression \
    of Cambridge Street and Broadway, is used at various times for food trucks, roller skating, ice \
    skating, and other activities such as markets and concerts. Tents are erected for special events \
    such as Commencement. An installation of large boulders and landscaping operates as a fountain \
    during good weather.`
  },
  {
    position: {lat: 42.37435355768863, lng: -71.11549895273889},
    title: 'Sever Hall',
    sid: 'opSBz3SgMg3',
    description: `Sever Hall is an academic building at Harvard University designed by the American architect H. H. Richardson and built in the late 1870s. It is located in Harvard Yard in Cambridge, Massachusetts. It was designated a National \
    Historic Landmark in 1970, recognized as one of Richardson's mature masterpieces`
  },
  {
    position: { lat: 42.372262942322884, lng: -71.11987174774083 }, 
    title: 'Weissman Preservation Center',
    sid: '8iApc5dtvmi',
    description: 'The Weissman Preservation Center exists to preserve the collections of books, manuscripts, prints, drawings, maps, photographs, and other holdings of Harvard University',
  },
  {
    position: {lat: 42.3734341345306, lng: -71.11649941670565},
    title: 'Widener Library',
    sid: 'fs3gQv7n1QG',
    description: `The Harry Elkins Widener Memorial Library, housing some 3.5 million books in its "vast and cavernous" stacks, is the center­piece of the Harvard College Libraries (the libraries of Harvard's Faculty of Arts and Sciences) \
    and, more broadly, of the entire Harvard Library system. It honors 1907 Harvard College graduate and book collector Harry Elkins Widener, and was built by his mother Eleanor Elkins Widener after his death in the sinking of the RMS Titanic in 1912.`
  },
];

let kmlHarvard1 = `-71.1220282,42.3764639
-71.1222206, 42.3765968
-71.1235832,42.3762798
-71.1242054,42.3760975
-71.1244951,42.375939
-71.1247955,42.3750909
-71.1234598,42.3747382
-71.1231486,42.3744608
-71.1241572,42.3738069
-71.1229566,42.3733452
-71.1233107,42.3728537
-71.1243997,42.371962
-71.1218033,42.3706463
-71.1224256,42.3698536
-71.1214814,42.3697743
-71.1193357,42.3698377
-71.118134,42.3696951
-71.1172757,42.3692036
-71.1162672,42.3677768
-71.1146901,42.3677451
-71.1146364,42.3693304
-71.1134348,42.3692432
-71.1133168,42.3700121
-71.1161703,42.3709632
-71.1155266,42.3715022
-71.1155695,42.372168
-71.1147112,42.3714705
-71.114282,42.3719778
-71.1134666,42.3718509
-71.1123508,42.3737532
-71.1133808,42.3741337
-71.1126941,42.3752116
-71.1124366,42.3768602
-71.1115354,42.3771138
-71.1123508,42.37965
-71.1113638,42.37965
-71.1111921,42.3807595
-71.1120933,42.3814886
-71.1141318,42.3803474
-71.1144966,42.3807595
-71.1163419,42.3808229
-71.1159986,42.3836125
-71.1194318,42.3838661
-71.1195606,42.3825981
-71.1201185,42.3776686
-71.1191958,42.3751482
-71.1220282,42.3764639`

let kmlHarvard2 = `-71.1160822,42.3628345
-71.1145802,42.3628979
-71.1148377,42.3643566
-71.1147733,42.3647847
-71.1150094,42.3647767
-71.114945,42.3651572
-71.1148162,42.3657518
-71.1147519,42.3662115
-71.1135288,42.3661878
-71.1135181,42.3671945
-71.1161573,42.367242
-71.115932,42.3666396
-71.1158999,42.3657835
-71.1160179,42.3643169
-71.1160822,42.3628345`

let kmlHarvard3 = `-71.1248801,42.3828723
-71.1255131,42.3839501
-71.1267201,42.3835102
-71.1276964,42.3830545
-71.1273907,42.382694
-71.128013,42.382373
-71.128646,42.3820203
-71.1291019,42.3822739
-71.1297403,42.3816835
-71.1274819,42.3804036
-71.1268328,42.3810376
-71.1261354,42.3813982
-71.1250464,42.3801223
-71.1229382,42.3809861
-71.1219351,42.3813665
-71.1230455,42.3826662
-71.1240057,42.3822541
-71.1246119,42.3829991
-71.1248801,42.3828723`

let kmlBusiness = `-71.1236501,42.3683276
-71.1257958,42.3691044
-71.1266541,42.3699446
-71.1268902,42.3710543
-71.1276197,42.372275
-71.1287999,42.3726237
-71.1296797,42.3723701
-71.1302376,42.3712446
-71.1304307,42.3688032
-71.1313534,42.3671703
-71.1273193,42.3650934
-71.1282635,42.3643641
-71.1299801,42.3650617
-71.1311173,42.3630323
-71.1297441,42.3632225
-71.1304736,42.3622713
-71.1303234,42.3615419
-71.1296797,42.3610821
-71.127491,42.3593063
-71.1246157,42.3608918
-71.1250019,42.3613041
-71.1246157,42.3625884
-71.1240149,42.3629847
-71.1241007,42.3636348
-71.1230493,42.3637458
-71.1179852,42.3641421
-71.1180711,42.3666629
-71.1191225,42.3675983
-71.1222553,42.3677569
-71.1236501,42.3683276`

let scienceCenter = `-71.1160219,42.376699
-71.1160889,42.3768624
-71.1166455,42.3767525
-71.1164041,42.3760669
-71.1158462,42.3761828
-71.1159857,42.3765454
-71.1159642,42.3765504
-71.1160219,42.376699`

let boylstonHall = `-71.1174078,42.3732535
-71.1173179,42.3732362
-71.1173159,42.3732431
-71.1173025,42.3732402
-71.1173058,42.3732337
-71.117267,42.3732263
-71.1172636,42.3732337
-71.1172361,42.3732293
-71.1172395,42.3732213
-71.1171657,42.373208
-71.117161,42.3732144
-71.1171322,42.373208
-71.1171201,42.3732392
-71.1171114,42.3732372
-71.1171007,42.3732644
-71.11711,42.3732664
-71.117104,42.3732853
-71.1170946,42.3732833
-71.1170846,42.37331
-71.1170946,42.3733115
-71.1170893,42.3733279
-71.1170758,42.3733259
-71.1170665,42.3733546
-71.1170758,42.3733561
-71.1170645,42.3733883
-71.1170973,42.3733947
-71.1170933,42.3734036
-71.1171704,42.373417
-71.1171731,42.3734101
-71.1171945,42.3734136
-71.1171925,42.3734205
-71.117218,42.373424
-71.117214,42.3734324
-71.1173172,42.3734517
-71.1173213,42.3734458
-71.1173454,42.3734512
-71.1173488,42.3734428
-71.1173682,42.3734463
-71.1173655,42.3734547
-71.117442,42.3734685
-71.1174447,42.3734626
-71.1174728,42.3734671
-71.1174822,42.3734428
-71.1174909,42.3734448
-71.1175037,42.3734106
-71.1174963,42.3734096
-71.117503,42.3733918
-71.1175097,42.3733937
-71.1175218,42.373365
-71.1175124,42.3733625
-71.1175184,42.3733477
-71.1175265,42.3733497
-71.1175379,42.3733199
-71.1175278,42.3733179
-71.1175399,42.3732862
-71.117511,42.3732808
-71.117513,42.3732734
-71.1174366,42.37326
-71.1174339,42.3732659
-71.1174037,42.373258
-71.1174078,42.3732535`

let cgis = `-71.1130364,42.3754377
-71.1129855,42.3756328
-71.1129935,42.3756893
-71.113023,42.3757498
-71.1131062,42.3758132
-71.1134374,42.3758587
-71.1135286,42.3754922
-71.1130364,42.3754377`

let harvardHall = `-71.1184042,42.374858
-71.1183982,42.374852
-71.1184156,42.3748139
-71.1180267,42.3747321
-71.1179677,42.3748862
-71.1183606,42.3749689
-71.1184042,42.374858`

let lcpa = `-71.1183782,42.3763719
-71.1183876,42.3763372
-71.1181543,42.3763045
-71.1181409,42.3763451
-71.117937,42.3763144
-71.117941,42.3763015
-71.1178016,42.3762787
-71.1177613,42.3764353
-71.118688,42.37657
-71.118731,42.3764105
-71.1185808,42.3763867
-71.1185754,42.3764016
-71.1183782,42.3763719`

let robinsonHall = `-71.1152544,42.3746825
-71.114718,42.3745835
-71.1146483,42.3747876
-71.1151941,42.3748837
-71.1152544,42.3746825`

let serverHall = `-71.1156621,42.3743004
-71.1156983,42.3742846
-71.1156983,42.3742558
-71.1156755,42.3742449
-71.115705,42.3741528
-71.1154233,42.3741062
-71.1153965,42.3741994
-71.1153724,42.3742023
-71.1153576,42.3742112
-71.1153536,42.374232
-71.1153764,42.3742489
-71.1153201,42.3744272
-71.1152865,42.3744441
-71.1152772,42.3744688
-71.1153026,42.3744887
-71.1152705,42.3745867
-71.1155521,42.3746353
-71.1155829,42.3745372
-71.1156111,42.3745342
-71.1156285,42.3745065
-71.1156044,42.3744837
-71.1156621,42.3743004`

let wpc = `-71.1200277,42.3722594
-71.1199808,42.3722351
-71.1200022,42.3722113
-71.1198433,42.372133
-71.1197467,42.3722395
-71.119736,42.3722346
-71.119677,42.3723124
-71.1199043,42.3723991
-71.1200277,42.3722594`

let wl = `-71.1169839,42.3732106
-71.1168793,42.3731809
-71.1168847,42.3731571
-71.1163241,42.37306
-71.116316,42.3730818
-71.1162114,42.373064
-71.1161739,42.3731908
-71.1162034,42.3732146
-71.1160746,42.373595
-71.1160424,42.3735931
-71.1160103,42.373708
-71.116021,42.3737496
-71.1161336,42.3737714
-71.1161175,42.3738566
-71.1161175,42.3738705
-71.116603,42.3739458
-71.1166325,42.3738546
-71.1167479,42.3738685
-71.1167827,42.3738467
-71.1168203,42.3737199
-71.1167988,42.373702
-71.1169168,42.3733335
-71.116941,42.3733355
-71.1169839,42.3732106`

let museum = `-71.1140601,42.3780248
-71.114036,42.3779495
-71.1138308,42.3779892
-71.1138429,42.3780228
-71.1137584,42.3780387
-71.1138107,42.3781952
-71.1138992,42.3781794
-71.1139113,42.3782111
-71.1141178,42.3781695
-71.114091,42.3780971
-71.1141191,42.3780932
-71.1140883,42.3780199
-71.1140601,42.3780248`

let lowellHouse = `-71.1191702,42.370775
-71.1189959,42.3707036
-71.1189798,42.3707254
-71.1188913,42.3706957
-71.1189074,42.3706759
-71.1187974,42.3706422
-71.1188216,42.3706065
-71.1188108,42.3705808
-71.1186606,42.3705312
-71.1186284,42.3705392
-71.118615,42.3705709
-71.1184997,42.3705411
-71.118489,42.370555
-71.1184165,42.3705332
-71.11843,42.3705154
-71.1183012,42.3704738
-71.1182932,42.3704956
-71.1179364,42.3703767
-71.1179472,42.3703588
-71.1178211,42.3703172
-71.1174644,42.3709196
-71.117569,42.3709513
-71.1175582,42.3709692
-71.1179579,42.3711059
-71.117974,42.3710881
-71.1180357,42.3711039
-71.1180249,42.3711237
-71.1188189,42.3713794
-71.119071,42.3709672
-71.1190495,42.3709593
-71.1191702,42.370775`

const buildings = [scienceCenter, boylstonHall, cgis, harvardHall, 
  lcpa, robinsonHall, serverHall, wpc, wl, museum, lowellHouse]

const coorData = [kmlHarvard1, kmlHarvard2, kmlHarvard3, kmlBusiness]