# Field trials index

Client-library field trials for [nene2-js](https://github.com/hideyukiMORI/nene2-js).  
Methodology: `docs/development/field-trials.md` · Template: `docs/templates/field-trial-report.md` · Friction cycle: [ADR 0004](../adr/0004-field-trial-friction-resolution-cycle.md)

| FT  | Report                                                   | Theme                                     | Status | Friction     |
| --- | -------------------------------------------------------- | ----------------------------------------- | ------ | ------------ |
| 1   | [2026-05-field-trial-1.md](2026-05-field-trial-1.md)     | OpenAPI pin + Problem Details             | done   | in report    |
| 2   | [2026-05-field-trial-2.md](2026-05-field-trial-2.md)     | `createNene2Client` health / ping         | done   | in report    |
| 3   | [2026-05-field-trial-3.md](2026-05-field-trial-3.md)     | Example notes + degraded health           | done   | #16 #17      |
| 4   | [2026-05-field-trial-4.md](2026-05-field-trial-4.md)     | `getProtected` + bearer                   | done   | #19          |
| 5   | [2026-05-field-trial-5.md](2026-05-field-trial-5.md)     | Note update/delete + evac ports           | done   | #21          |
| 6   | [2026-05-field-trial-6.md](2026-05-field-trial-6.md)     | Example tags CRUD                         | done   | #23          |
| 7   | [2026-05-field-trial-7.md](2026-05-field-trial-7.md)     | Live JWT `getProtected`                   | done   | #25          |
| 8   | [2026-05-field-trial-8.md](2026-05-field-trial-8.md)     | Live notes CRUD                           | done   | #26          |
| 9   | [2026-05-field-trial-9.md](2026-05-field-trial-9.md)     | Live tags CRUD                            | done   | #27          |
| 10  | [2026-05-field-trial-10.md](2026-05-field-trial-10.md)   | `frameworkSmoke`                          | done   | #30          |
| 11  | [2026-05-field-trial-11.md](2026-05-field-trial-11.md)   | `machineHealth`                           | done   | #30          |
| 12  | [2026-05-field-trial-12.md](2026-05-field-trial-12.md)   | `smoke()` helper                          | done   | #30          |
| 13  | [2026-05-field-trial-13.md](2026-05-field-trial-13.md)   | `AbortSignal`                             | done   | #30          |
| 14  | [2026-05-field-trial-14.md](2026-05-field-trial-14.md)   | Validation error helpers                  | done   | #30          |
| 15  | [2026-05-field-trial-15.md](2026-05-field-trial-15.md)   | HTML JSON hint                            | done   | #30          |
| 16  | [2026-05-field-trial-16.md](2026-05-field-trial-16.md)   | Live frameworkSmoke                       | done   | #30          |
| 17  | [2026-05-field-trial-17.md](2026-05-field-trial-17.md)   | Live machineHealth                        | done   | #30          |
| 18  | [2026-05-field-trial-18.md](2026-05-field-trial-18.md)   | Live 422 validation                       | done   | #30          |
| 19  | [2026-05-field-trial-19.md](2026-05-field-trial-19.md)   | consume-client howto                      | done   | #30          |
| 20  | [2026-05-field-trial-20.md](2026-05-field-trial-20.md)   | baseUrl trailing slash                    | done   | #30          |
| 21  | [2026-05-field-trial-21.md](2026-05-field-trial-21.md)   | Parallel list endpoints                   | done   | #30          |
| 22  | [2026-05-field-trial-22.md](2026-05-field-trial-22.md)   | Export surface                            | done   | #30          |
| 23  | [2026-05-field-trial-23.md](2026-05-field-trial-23.md)   | Evac machine API key                      | done   | #30          |
| 24  | [2026-05-field-trial-24.md](2026-05-field-trial-24.md)   | README `smoke()`                          | done   | #30          |
| 25  | [2026-05-field-trial-25.md](2026-05-field-trial-25.md)   | Evac live script                          | done   | #30          |
| 26  | [2026-05-field-trial-26.md](2026-05-field-trial-26.md)   | Tags delete 404                           | done   | #30          |
| 27  | [2026-05-field-trial-27.md](2026-05-field-trial-27.md)   | Protected 401                             | done   | #30          |
| 28  | [2026-05-field-trial-28.md](2026-05-field-trial-28.md)   | contracts:check in loop                   | done   | #30          |
| 29  | [2026-05-field-trial-29.md](2026-05-field-trial-29.md)   | Marathon INDEX                            | done   | #30          |
| 30  | [2026-05-field-trial-30.md](2026-05-field-trial-30.md)   | health 200 ok                             | done   | #31          |
| 31  | [2026-05-field-trial-31.md](2026-05-field-trial-31.md)   | health 503 throw default                  | done   | #31          |
| 32  | [2026-05-field-trial-32.md](2026-05-field-trial-32.md)   | health 503 allowDegraded                  | done   | #31          |
| 33  | [2026-05-field-trial-33.md](2026-05-field-trial-33.md)   | health checks map ok                      | done   | #31          |
| 34  | [2026-05-field-trial-34.md](2026-05-field-trial-34.md)   | health service must be NENE2              | done   | #31          |
| 35  | [2026-05-field-trial-35.md](2026-05-field-trial-35.md)   | health invalid shape                      | done   | #31          |
| 36  | [2026-05-field-trial-36.md](2026-05-field-trial-36.md)   | health html wrong port                    | done   | #31          |
| 37  | [2026-05-field-trial-37.md](2026-05-field-trial-37.md)   | health 500 problem                        | done   | #31          |
| 38  | [2026-05-field-trial-38.md](2026-05-field-trial-38.md)   | frameworkSmoke GET /                      | done   | #31          |
| 39  | [2026-05-field-trial-39.md](2026-05-field-trial-39.md)   | ping pong                                 | done   | #31          |
| 40  | [2026-05-field-trial-40.md](2026-05-field-trial-40.md)   | smoke parallel                            | done   | #31          |
| 41  | [2026-05-field-trial-41.md](2026-05-field-trial-41.md)   | machineHealth 200                         | done   | #31          |
| 42  | [2026-05-field-trial-42.md](2026-05-field-trial-42.md)   | machineHealth 401                         | done   | #31          |
| 43  | [2026-05-field-trial-43.md](2026-05-field-trial-43.md)   | framework bad status                      | done   | #31          |
| 44  | [2026-05-field-trial-44.md](2026-05-field-trial-44.md)   | ping bad message                          | done   | #31          |
| 45  | [2026-05-field-trial-45.md](2026-05-field-trial-45.md)   | listNotes                                 | done   | #31          |
| 46  | [2026-05-field-trial-46.md](2026-05-field-trial-46.md)   | listNotes query                           | done   | #31          |
| 47  | [2026-05-field-trial-47.md](2026-05-field-trial-47.md)   | getNote                                   | done   | #31          |
| 48  | [2026-05-field-trial-48.md](2026-05-field-trial-48.md)   | createNote                                | done   | #31          |
| 49  | [2026-05-field-trial-49.md](2026-05-field-trial-49.md)   | updateNote                                | done   | #31          |
| 50  | [2026-05-field-trial-50.md](2026-05-field-trial-50.md)   | deleteNote                                | done   | #31          |
| 51  | [2026-05-field-trial-51.md](2026-05-field-trial-51.md)   | getNote 404                               | done   | #31          |
| 52  | [2026-05-field-trial-52.md](2026-05-field-trial-52.md)   | createNote 422                            | done   | #31          |
| 53  | [2026-05-field-trial-53.md](2026-05-field-trial-53.md)   | createNote POST body                      | done   | #31          |
| 54  | [2026-05-field-trial-54.md](2026-05-field-trial-54.md)   | update path                               | done   | #31          |
| 55  | [2026-05-field-trial-55.md](2026-05-field-trial-55.md)   | delete path                               | done   | #31          |
| 56  | [2026-05-field-trial-56.md](2026-05-field-trial-56.md)   | listTags                                  | done   | #31          |
| 57  | [2026-05-field-trial-57.md](2026-05-field-trial-57.md)   | listTags query                            | done   | #31          |
| 58  | [2026-05-field-trial-58.md](2026-05-field-trial-58.md)   | getTag                                    | done   | #31          |
| 59  | [2026-05-field-trial-59.md](2026-05-field-trial-59.md)   | createTag                                 | done   | #31          |
| 60  | [2026-05-field-trial-60.md](2026-05-field-trial-60.md)   | updateTag                                 | done   | #31          |
| 61  | [2026-05-field-trial-61.md](2026-05-field-trial-61.md)   | deleteTag                                 | done   | #31          |
| 62  | [2026-05-field-trial-62.md](2026-05-field-trial-62.md)   | getTag 404                                | done   | #31          |
| 63  | [2026-05-field-trial-63.md](2026-05-field-trial-63.md)   | createTag body                            | done   | #31          |
| 64  | [2026-05-field-trial-64.md](2026-05-field-trial-64.md)   | update path                               | done   | #31          |
| 65  | [2026-05-field-trial-65.md](2026-05-field-trial-65.md)   | delete path                               | done   | #31          |
| 66  | [2026-05-field-trial-66.md](2026-05-field-trial-66.md)   | getProtected ok                           | done   | #31          |
| 67  | [2026-05-field-trial-67.md](2026-05-field-trial-67.md)   | getProtected 401                          | done   | #31          |
| 68  | [2026-05-field-trial-68.md](2026-05-field-trial-68.md)   | bearer header                             | done   | #31          |
| 69  | [2026-05-field-trial-69.md](2026-05-field-trial-69.md)   | invalid jwt                               | done   | #31          |
| 70  | [2026-05-field-trial-70.md](2026-05-field-trial-70.md)   | claims sub                                | done   | #31          |
| 71  | [2026-05-field-trial-71.md](2026-05-field-trial-71.md)   | welcome message                           | done   | #31          |
| 72  | [2026-05-field-trial-72.md](2026-05-field-trial-72.md)   | apiKey machine                            | done   | #31          |
| 73  | [2026-05-field-trial-73.md](2026-05-field-trial-73.md)   | bearer protected                          | done   | #31          |
| 74  | [2026-05-field-trial-74.md](2026-05-field-trial-74.md)   | both headers                              | done   | #31          |
| 75  | [2026-05-field-trial-75.md](2026-05-field-trial-75.md)   | X-NENE2-API-Key name                      | done   | #31          |
| 76  | [2026-05-field-trial-76.md](2026-05-field-trial-76.md)   | Authorization Bearer                      | done   | #31          |
| 77  | [2026-05-field-trial-77.md](2026-05-field-trial-77.md)   | public no auth                            | done   | #31          |
| 78  | [2026-05-field-trial-78.md](2026-05-field-trial-78.md)   | no apiKey on health                       | done   | #31          |
| 79  | [2026-05-field-trial-79.md](2026-05-field-trial-79.md)   | trailing slash                            | done   | #31          |
| 80  | [2026-05-field-trial-80.md](2026-05-field-trial-80.md)   | empty baseUrl                             | done   | #31          |
| 81  | [2026-05-field-trial-81.md](2026-05-field-trial-81.md)   | custom fetch                              | done   | #31          |
| 82  | [2026-05-field-trial-82.md](2026-05-field-trial-82.md)   | AbortSignal                               | done   | #31          |
| 83  | [2026-05-field-trial-83.md](2026-05-field-trial-83.md)   | port in baseUrl                           | done   | #31          |
| 84  | [2026-05-field-trial-84.md](2026-05-field-trial-84.md)   | fetch required                            | done   | #31          |
| 85  | [2026-05-field-trial-85.md](2026-05-field-trial-85.md)   | two clients                               | done   | #31          |
| 86  | [2026-05-field-trial-86.md](2026-05-field-trial-86.md)   | strip only trailing                       | done   | #31          |
| 87  | [2026-05-field-trial-87.md](2026-05-field-trial-87.md)   | 404 not-found                             | done   | #31          |
| 88  | [2026-05-field-trial-88.md](2026-05-field-trial-88.md)   | 422 validation                            | done   | #31          |
| 89  | [2026-05-field-trial-89.md](2026-05-field-trial-89.md)   | 500 internal                              | done   | #31          |
| 90  | [2026-05-field-trial-90.md](2026-05-field-trial-90.md)   | 401 unauthorized                          | done   | #31          |
| 91  | [2026-05-field-trial-91.md](2026-05-field-trial-91.md)   | 413 too large                             | done   | #31          |
| 92  | [2026-05-field-trial-92.md](2026-05-field-trial-92.md)   | invalid json                              | done   | #31          |
| 93  | [2026-05-field-trial-93.md](2026-05-field-trial-93.md)   | html 200                                  | done   | #31          |
| 94  | [2026-05-field-trial-94.md](2026-05-field-trial-94.md)   | 204 delete                                | done   | #31          |
| 95  | [2026-05-field-trial-95.md](2026-05-field-trial-95.md)   | problem detail text                       | done   | #31          |
| 96  | [2026-05-field-trial-96.md](2026-05-field-trial-96.md)   | shape mismatch                            | done   | #31          |
| 97  | [2026-05-field-trial-97.md](2026-05-field-trial-97.md)   | isProblemDetails                          | done   | #31          |
| 98  | [2026-05-field-trial-98.md](2026-05-field-trial-98.md)   | isValidationPD                            | done   | #31          |
| 99  | [2026-05-field-trial-99.md](2026-05-field-trial-99.md)   | parseResponse                             | done   | #31          |
| 100 | [2026-05-field-trial-100.md](2026-05-field-trial-100.md) | validation type URI                       | done   | #31          |
| 101 | [2026-05-field-trial-101.md](2026-05-field-trial-101.md) | extensions                                | done   | #31          |
| 102 | [2026-05-field-trial-102.md](2026-05-field-trial-102.md) | isValidationError                         | done   | #31          |
| 103 | [2026-05-field-trial-103.md](2026-05-field-trial-103.md) | non-problem undefined                     | done   | #31          |
| 104 | [2026-05-field-trial-104.md](2026-05-field-trial-104.md) | fromClientError                           | done   | #31          |
| 105 | [2026-05-field-trial-105.md](2026-05-field-trial-105.md) | byField                                   | done   | #31          |
| 106 | [2026-05-field-trial-106.md](2026-05-field-trial-106.md) | non-client undefined                      | done   | #31          |
| 107 | [2026-05-field-trial-107.md](2026-05-field-trial-107.md) | 404 no extract                            | done   | #31          |
| 108 | [2026-05-field-trial-108.md](2026-05-field-trial-108.md) | type URI match                            | done   | #31          |
| 109 | [2026-05-field-trial-109.md](2026-05-field-trial-109.md) | error code field                          | done   | #31          |
| 110 | [2026-05-field-trial-110.md](2026-05-field-trial-110.md) | smoke parallel                            | done   | #31          |
| 111 | [2026-05-field-trial-111.md](2026-05-field-trial-111.md) | parallel lists                            | done   | #31          |
| 112 | [2026-05-field-trial-112.md](2026-05-field-trial-112.md) | seq health                                | done   | #31          |
| 113 | [2026-05-field-trial-113.md](2026-05-field-trial-113.md) | create then get                           | done   | #31          |
| 114 | [2026-05-field-trial-114.md](2026-05-field-trial-114.md) | notes limit                               | done   | #31          |
| 115 | [2026-05-field-trial-115.md](2026-05-field-trial-115.md) | notes offset                              | done   | #31          |
| 116 | [2026-05-field-trial-116.md](2026-05-field-trial-116.md) | notes both                                | done   | #31          |
| 117 | [2026-05-field-trial-117.md](2026-05-field-trial-117.md) | tags limit                                | done   | #31          |
| 118 | [2026-05-field-trial-118.md](2026-05-field-trial-118.md) | tags offset zero                          | done   | #31          |
| 119 | [2026-05-field-trial-119.md](2026-05-field-trial-119.md) | live health                               | done   | #31          |
| 120 | [2026-05-field-trial-120.md](2026-05-field-trial-120.md) | live ping                                 | done   | #31          |
| 121 | [2026-05-field-trial-121.md](2026-05-field-trial-121.md) | live smoke                                | done   | #31          |
| 122 | [2026-05-field-trial-122.md](2026-05-field-trial-122.md) | live framework                            | done   | #31          |
| 123 | [2026-05-field-trial-123.md](2026-05-field-trial-123.md) | live machine                              | done   | #31          |
| 124 | [2026-05-field-trial-124.md](2026-05-field-trial-124.md) | live listNotes                            | done   | #31          |
| 125 | [2026-05-field-trial-125.md](2026-05-field-trial-125.md) | live notes CRUD                           | done   | #31          |
| 126 | [2026-05-field-trial-126.md](2026-05-field-trial-126.md) | live tags CRUD                            | done   | #31          |
| 127 | [2026-05-field-trial-127.md](2026-05-field-trial-127.md) | live protected                            | done   | #31          |
| 128 | [2026-05-field-trial-128.md](2026-05-field-trial-128.md) | live 422                                  | done   | #31          |
| 129 | [2026-05-field-trial-129.md](2026-05-field-trial-129.md) | live listTags                             | done   | #31          |
| 130 | [2026-05-field-trial-130.md](2026-05-field-trial-130.md) | [ts_app/nene2_first] ja doc: getting_sta  | done   | #45          |
| 131 | [2026-05-field-trial-131.md](2026-05-field-trial-131.md) | [ts_app/nene2_first] ja doc: getting_sta  | done   | #45          |
| 132 | [2026-05-field-trial-132.md](2026-05-field-trial-132.md) | [ts_app/nene2_first] ja doc: getting_sta  | done   | #45          |
| 133 | [2026-05-field-trial-133.md](2026-05-field-trial-133.md) | [ts_app/nene2_first] ja doc: getting_sta  | done   | #45          |
| 134 | [2026-05-field-trial-134.md](2026-05-field-trial-134.md) | [ts_app/python_first] ja doc: getting_st  | done   | #45          |
| 135 | [2026-05-field-trial-135.md](2026-05-field-trial-135.md) | [ts_app/python_first] ja doc: getting_st  | done   | #45          |
| 136 | [2026-05-field-trial-136.md](2026-05-field-trial-136.md) | [ts_app/python_first] ja doc: getting_st  | done   | #45          |
| 137 | [2026-05-field-trial-137.md](2026-05-field-trial-137.md) | [ts_app/python_first] ja doc: getting_st  | done   | #45          |
| 138 | [2026-05-field-trial-138.md](2026-05-field-trial-138.md) | [ts_app/alt_ports] ja doc: getting_start  | done   | #45          |
| 139 | [2026-05-field-trial-139.md](2026-05-field-trial-139.md) | [ts_app/alt_ports] ja doc: getting_start  | done   | #45          |
| 140 | [2026-05-field-trial-140.md](2026-05-field-trial-140.md) | [ts_app/alt_ports] ja doc: getting_start  | done   | #45          |
| 141 | [2026-05-field-trial-141.md](2026-05-field-trial-141.md) | [ts_app/alt_ports] ja doc: getting_start  | done   | #45          |
| 142 | [2026-05-field-trial-142.md](2026-05-field-trial-142.md) | [ts_app/client_only] ja doc: getting_sta  | done   | #45          |
| 143 | [2026-05-field-trial-143.md](2026-05-field-trial-143.md) | [ts_app/client_only] ja doc: getting_sta  | done   | #45          |
| 144 | [2026-05-field-trial-144.md](2026-05-field-trial-144.md) | [ts_app/client_only] ja doc: getting_sta  | done   | #45          |
| 145 | [2026-05-field-trial-145.md](2026-05-field-trial-145.md) | [ts_app/client_only] ja doc: getting_sta  | done   | #45          |
| 146 | [2026-05-field-trial-146.md](2026-05-field-trial-146.md) | [py_dev/nene2_first] ja doc: getting_sta  | done   | #45          |
| 147 | [2026-05-field-trial-147.md](2026-05-field-trial-147.md) | [py_dev/nene2_first] ja doc: getting_sta  | done   | #45          |
| 148 | [2026-05-field-trial-148.md](2026-05-field-trial-148.md) | [py_dev/nene2_first] ja doc: getting_sta  | done   | #45          |
| 149 | [2026-05-field-trial-149.md](2026-05-field-trial-149.md) | [py_dev/nene2_first] ja doc: getting_sta  | done   | #45          |
| 150 | [2026-05-field-trial-150.md](2026-05-field-trial-150.md) | [py_dev/python_first] ja doc: getting_st  | done   | #45          |
| 151 | [2026-05-field-trial-151.md](2026-05-field-trial-151.md) | [py_dev/python_first] ja doc: getting_st  | done   | #45          |
| 152 | [2026-05-field-trial-152.md](2026-05-field-trial-152.md) | [py_dev/python_first] ja doc: getting_st  | done   | #45          |
| 153 | [2026-05-field-trial-153.md](2026-05-field-trial-153.md) | [py_dev/python_first] ja doc: getting_st  | done   | #45          |
| 154 | [2026-05-field-trial-154.md](2026-05-field-trial-154.md) | [py_dev/alt_ports] ja doc: getting_start  | done   | #45          |
| 155 | [2026-05-field-trial-155.md](2026-05-field-trial-155.md) | [py_dev/alt_ports] ja doc: getting_start  | done   | #45          |
| 156 | [2026-05-field-trial-156.md](2026-05-field-trial-156.md) | [py_dev/alt_ports] ja doc: getting_start  | done   | #45          |
| 157 | [2026-05-field-trial-157.md](2026-05-field-trial-157.md) | [py_dev/alt_ports] ja doc: getting_start  | done   | #45          |
| 158 | [2026-05-field-trial-158.md](2026-05-field-trial-158.md) | [py_dev/client_only] ja doc: getting_sta  | done   | #45          |
| 159 | [2026-05-field-trial-159.md](2026-05-field-trial-159.md) | [py_dev/client_only] ja doc: getting_sta  | done   | #45          |
| 160 | [2026-05-field-trial-160.md](2026-05-field-trial-160.md) | [py_dev/client_only] ja doc: getting_sta  | done   | #45          |
| 161 | [2026-05-field-trial-161.md](2026-05-field-trial-161.md) | [py_dev/client_only] ja doc: getting_sta  | done   | #45          |
| 162 | [2026-05-field-trial-162.md](2026-05-field-trial-162.md) | [php_dev/nene2_first] ja doc: getting_st  | done   | #45          |
| 163 | [2026-05-field-trial-163.md](2026-05-field-trial-163.md) | [php_dev/nene2_first] ja doc: getting_st  | done   | #45          |
| 164 | [2026-05-field-trial-164.md](2026-05-field-trial-164.md) | [php_dev/nene2_first] ja doc: getting_st  | done   | #45          |
| 165 | [2026-05-field-trial-165.md](2026-05-field-trial-165.md) | [php_dev/nene2_first] ja doc: getting_st  | done   | #45          |
| 166 | [2026-05-field-trial-166.md](2026-05-field-trial-166.md) | [php_dev/python_first] ja doc: getting_s  | done   | #45          |
| 167 | [2026-05-field-trial-167.md](2026-05-field-trial-167.md) | [php_dev/python_first] ja doc: getting_s  | done   | #45          |
| 168 | [2026-05-field-trial-168.md](2026-05-field-trial-168.md) | [php_dev/python_first] ja doc: getting_s  | done   | #45          |
| 169 | [2026-05-field-trial-169.md](2026-05-field-trial-169.md) | [php_dev/python_first] ja doc: getting_s  | done   | #45          |
| 170 | [2026-05-field-trial-170.md](2026-05-field-trial-170.md) | [php_dev/alt_ports] ja doc: getting_star  | done   | #45          |
| 171 | [2026-05-field-trial-171.md](2026-05-field-trial-171.md) | [php_dev/alt_ports] ja doc: getting_star  | done   | #45          |
| 172 | [2026-05-field-trial-172.md](2026-05-field-trial-172.md) | [php_dev/alt_ports] ja doc: getting_star  | done   | #45          |
| 173 | [2026-05-field-trial-173.md](2026-05-field-trial-173.md) | [php_dev/alt_ports] ja doc: getting_star  | done   | #45          |
| 174 | [2026-05-field-trial-174.md](2026-05-field-trial-174.md) | [php_dev/client_only] ja doc: getting_st  | done   | #45          |
| 175 | [2026-05-field-trial-175.md](2026-05-field-trial-175.md) | [php_dev/client_only] ja doc: getting_st  | done   | #45          |
| 176 | [2026-05-field-trial-176.md](2026-05-field-trial-176.md) | [php_dev/client_only] ja doc: getting_st  | done   | #45          |
| 177 | [2026-05-field-trial-177.md](2026-05-field-trial-177.md) | [php_dev/client_only] ja doc: getting_st  | done   | #45          |
| 178 | [2026-05-field-trial-178.md](2026-05-field-trial-178.md) | [devops/nene2_first] ja doc: getting_sta  | done   | #45          |
| 179 | [2026-05-field-trial-179.md](2026-05-field-trial-179.md) | [devops/nene2_first] ja doc: getting_sta  | done   | #45          |
| 180 | [2026-05-field-trial-180.md](2026-05-field-trial-180.md) | [devops/nene2_first] ja doc: getting_sta  | done   | #45          |
| 181 | [2026-05-field-trial-181.md](2026-05-field-trial-181.md) | [devops/nene2_first] ja doc: getting_sta  | done   | #45          |
| 182 | [2026-05-field-trial-182.md](2026-05-field-trial-182.md) | [devops/python_first] ja doc: getting_st  | done   | #45          |
| 183 | [2026-05-field-trial-183.md](2026-05-field-trial-183.md) | [devops/python_first] ja doc: getting_st  | done   | #45          |
| 184 | [2026-05-field-trial-184.md](2026-05-field-trial-184.md) | [devops/python_first] ja doc: getting_st  | done   | #45          |
| 185 | [2026-05-field-trial-185.md](2026-05-field-trial-185.md) | [devops/python_first] ja doc: getting_st  | done   | #45          |
| 186 | [2026-05-field-trial-186.md](2026-05-field-trial-186.md) | [devops/alt_ports] ja doc: getting_start  | done   | #45          |
| 187 | [2026-05-field-trial-187.md](2026-05-field-trial-187.md) | [devops/alt_ports] ja doc: getting_start  | done   | #45          |
| 188 | [2026-05-field-trial-188.md](2026-05-field-trial-188.md) | [devops/alt_ports] ja doc: getting_start  | done   | #45          |
| 189 | [2026-05-field-trial-189.md](2026-05-field-trial-189.md) | [devops/alt_ports] ja doc: getting_start  | done   | #45          |
| 190 | [2026-05-field-trial-190.md](2026-05-field-trial-190.md) | [devops/client_only] ja doc: getting_sta  | done   | #45          |
| 191 | [2026-05-field-trial-191.md](2026-05-field-trial-191.md) | [devops/client_only] ja doc: getting_sta  | done   | #45          |
| 192 | [2026-05-field-trial-192.md](2026-05-field-trial-192.md) | [devops/client_only] ja doc: getting_sta  | done   | #45          |
| 193 | [2026-05-field-trial-193.md](2026-05-field-trial-193.md) | [devops/client_only] ja doc: getting_sta  | done   | #45          |
| 194 | [2026-05-field-trial-194.md](2026-05-field-trial-194.md) | [ai_agent/nene2_first] ja doc: getting_s  | done   | #45          |
| 195 | [2026-05-field-trial-195.md](2026-05-field-trial-195.md) | [ai_agent/nene2_first] ja doc: getting_s  | done   | #45          |
| 196 | [2026-05-field-trial-196.md](2026-05-field-trial-196.md) | [ai_agent/nene2_first] ja doc: getting_s  | done   | #45          |
| 197 | [2026-05-field-trial-197.md](2026-05-field-trial-197.md) | [ai_agent/nene2_first] ja doc: getting_s  | done   | #45          |
| 198 | [2026-05-field-trial-198.md](2026-05-field-trial-198.md) | [ai_agent/python_first] ja doc: getting\_ | done   | #45          |
| 199 | [2026-05-field-trial-199.md](2026-05-field-trial-199.md) | [ai_agent/python_first] ja doc: getting\_ | done   | #45          |
| 200 | [2026-05-field-trial-200.md](2026-05-field-trial-200.md) | [ai_agent/python_first] ja doc: getting\_ | done   | #45          |
| 201 | [2026-05-field-trial-201.md](2026-05-field-trial-201.md) | [ai_agent/python_first] ja doc: getting\_ | done   | #45          |
| 202 | [2026-05-field-trial-202.md](2026-05-field-trial-202.md) | [ts_app] client: smoke_fixture            | done   | #45          |
| 203 | [2026-05-field-trial-203.md](2026-05-field-trial-203.md) | [ts_app] client: health_wrong_service     | done   | resolved #46 |
| 204 | [2026-05-field-trial-204.md](2026-05-field-trial-204.md) | [ts_app] client: notes_list_fixture       | done   | #45          |
| 205 | [2026-05-field-trial-205.md](2026-05-field-trial-205.md) | [ts_app] client: protected_401_fixture    | done   | #45          |
| 206 | [2026-05-field-trial-206.md](2026-05-field-trial-206.md) | [ts_app] client: validation_422_fixture   | done   | #45          |
| 207 | [2026-05-field-trial-207.md](2026-05-field-trial-207.md) | [ts_app] client: html_wrong_port_hint     | done   | #45          |
| 208 | [2026-05-field-trial-208.md](2026-05-field-trial-208.md) | [ts_app] client: baseurl_trailing_slash   | done   | #45          |
| 209 | [2026-05-field-trial-209.md](2026-05-field-trial-209.md) | [ts_app] client: abort_signal             | done   | #45          |
| 210 | [2026-05-field-trial-210.md](2026-05-field-trial-210.md) | [ts_app] client: machine_health_401       | done   | #45          |
| 211 | [2026-05-field-trial-211.md](2026-05-field-trial-211.md) | [ts_app] client: create_note_fixture      | done   | #45          |
| 212 | [2026-05-field-trial-212.md](2026-05-field-trial-212.md) | [py_dev] client: smoke_fixture            | done   | #45          |
| 213 | [2026-05-field-trial-213.md](2026-05-field-trial-213.md) | [py_dev] client: health_wrong_service     | done   | resolved #46 |
| 214 | [2026-05-field-trial-214.md](2026-05-field-trial-214.md) | [py_dev] client: notes_list_fixture       | done   | #45          |
| 215 | [2026-05-field-trial-215.md](2026-05-field-trial-215.md) | [py_dev] client: protected_401_fixture    | done   | #45          |
| 216 | [2026-05-field-trial-216.md](2026-05-field-trial-216.md) | [py_dev] client: validation_422_fixture   | done   | #45          |
| 217 | [2026-05-field-trial-217.md](2026-05-field-trial-217.md) | [py_dev] client: html_wrong_port_hint     | done   | #45          |
| 218 | [2026-05-field-trial-218.md](2026-05-field-trial-218.md) | [py_dev] client: baseurl_trailing_slash   | done   | #45          |
| 219 | [2026-05-field-trial-219.md](2026-05-field-trial-219.md) | [py_dev] client: abort_signal             | done   | #45          |
| 220 | [2026-05-field-trial-220.md](2026-05-field-trial-220.md) | [py_dev] client: machine_health_401       | done   | #45          |
| 221 | [2026-05-field-trial-221.md](2026-05-field-trial-221.md) | [py_dev] client: create_note_fixture      | done   | #45          |
| 222 | [2026-05-field-trial-222.md](2026-05-field-trial-222.md) | [php_dev] client: smoke_fixture           | done   | #45          |
| 223 | [2026-05-field-trial-223.md](2026-05-field-trial-223.md) | [php_dev] client: health_wrong_service    | done   | resolved #46 |
| 224 | [2026-05-field-trial-224.md](2026-05-field-trial-224.md) | [php_dev] client: notes_list_fixture      | done   | #45          |
| 225 | [2026-05-field-trial-225.md](2026-05-field-trial-225.md) | live onboarding 1                         | done   | #45          |
| 226 | [2026-05-field-trial-226.md](2026-05-field-trial-226.md) | live onboarding 2                         | done   | #45          |
| 227 | [2026-05-field-trial-227.md](2026-05-field-trial-227.md) | live onboarding 3                         | done   | #45          |
| 228 | [2026-05-field-trial-228.md](2026-05-field-trial-228.md) | live onboarding 4                         | done   | #45          |
| 229 | [2026-05-field-trial-229.md](2026-05-field-trial-229.md) | live onboarding 5                         | done   | #45          |
| 230 | [2026-05-field-trial-230.md](2026-05-field-trial-230.md) | problem HTTP 400 on getNote               | done   | #42          |
| 231 | [2026-05-field-trial-231.md](2026-05-field-trial-231.md) | problem HTTP 400 on createNote            | done   | #42          |
| 232 | [2026-05-field-trial-232.md](2026-05-field-trial-232.md) | problem HTTP 401 on getNote               | done   | #42          |
| 233 | [2026-05-field-trial-233.md](2026-05-field-trial-233.md) | problem HTTP 401 on createNote            | done   | #42          |
| 234 | [2026-05-field-trial-234.md](2026-05-field-trial-234.md) | problem HTTP 403 on getNote               | done   | #42          |
| 235 | [2026-05-field-trial-235.md](2026-05-field-trial-235.md) | problem HTTP 403 on createNote            | done   | #42          |
| 236 | [2026-05-field-trial-236.md](2026-05-field-trial-236.md) | problem HTTP 404 on getNote               | done   | #42          |
| 237 | [2026-05-field-trial-237.md](2026-05-field-trial-237.md) | problem HTTP 404 on createNote            | done   | #42          |
| 238 | [2026-05-field-trial-238.md](2026-05-field-trial-238.md) | problem HTTP 405 on getNote               | done   | #42          |
| 239 | [2026-05-field-trial-239.md](2026-05-field-trial-239.md) | problem HTTP 405 on createNote            | done   | #42          |
| 240 | [2026-05-field-trial-240.md](2026-05-field-trial-240.md) | problem HTTP 409 on getNote               | done   | #42          |
| 241 | [2026-05-field-trial-241.md](2026-05-field-trial-241.md) | problem HTTP 409 on createNote            | done   | #42          |
| 242 | [2026-05-field-trial-242.md](2026-05-field-trial-242.md) | problem HTTP 413 on getNote               | done   | #42          |
| 243 | [2026-05-field-trial-243.md](2026-05-field-trial-243.md) | problem HTTP 413 on createNote            | done   | #42          |
| 244 | [2026-05-field-trial-244.md](2026-05-field-trial-244.md) | problem HTTP 422 on getNote               | done   | #42          |
| 245 | [2026-05-field-trial-245.md](2026-05-field-trial-245.md) | problem HTTP 422 on createNote            | done   | #42          |
| 246 | [2026-05-field-trial-246.md](2026-05-field-trial-246.md) | problem HTTP 429 on getNote               | done   | #42          |
| 247 | [2026-05-field-trial-247.md](2026-05-field-trial-247.md) | problem HTTP 429 on createNote            | done   | #42          |
| 248 | [2026-05-field-trial-248.md](2026-05-field-trial-248.md) | problem HTTP 500 on getNote               | done   | #42          |
| 249 | [2026-05-field-trial-249.md](2026-05-field-trial-249.md) | problem HTTP 500 on createNote            | done   | #42          |
| 250 | [2026-05-field-trial-250.md](2026-05-field-trial-250.md) | problem HTTP 502 on getNote               | done   | #42          |
| 251 | [2026-05-field-trial-251.md](2026-05-field-trial-251.md) | problem HTTP 502 on createNote            | done   | #42          |
| 252 | [2026-05-field-trial-252.md](2026-05-field-trial-252.md) | problem HTTP 503 on getNote               | done   | #42          |
| 253 | [2026-05-field-trial-253.md](2026-05-field-trial-253.md) | problem HTTP 503 on createNote            | done   | #42          |
| 254 | [2026-05-field-trial-254.md](2026-05-field-trial-254.md) | notes list limit=0                        | done   | #42          |
| 255 | [2026-05-field-trial-255.md](2026-05-field-trial-255.md) | tags list limit=0                         | done   | #42          |
| 256 | [2026-05-field-trial-256.md](2026-05-field-trial-256.md) | notes list limit=1                        | done   | #42          |
| 257 | [2026-05-field-trial-257.md](2026-05-field-trial-257.md) | tags list limit=1                         | done   | #42          |
| 258 | [2026-05-field-trial-258.md](2026-05-field-trial-258.md) | notes list limit=2                        | done   | #42          |
| 259 | [2026-05-field-trial-259.md](2026-05-field-trial-259.md) | tags list limit=2                         | done   | #42          |
| 260 | [2026-05-field-trial-260.md](2026-05-field-trial-260.md) | notes list limit=3                        | done   | #42          |
| 261 | [2026-05-field-trial-261.md](2026-05-field-trial-261.md) | tags list limit=3                         | done   | #42          |
| 262 | [2026-05-field-trial-262.md](2026-05-field-trial-262.md) | notes list limit=5                        | done   | #42          |
| 263 | [2026-05-field-trial-263.md](2026-05-field-trial-263.md) | tags list limit=5                         | done   | #42          |
| 264 | [2026-05-field-trial-264.md](2026-05-field-trial-264.md) | notes list limit=7                        | done   | #42          |
| 265 | [2026-05-field-trial-265.md](2026-05-field-trial-265.md) | tags list limit=7                         | done   | #42          |
| 266 | [2026-05-field-trial-266.md](2026-05-field-trial-266.md) | notes list limit=10                       | done   | #42          |
| 267 | [2026-05-field-trial-267.md](2026-05-field-trial-267.md) | tags list limit=10                        | done   | #42          |
| 268 | [2026-05-field-trial-268.md](2026-05-field-trial-268.md) | notes list limit=15                       | done   | #42          |
| 269 | [2026-05-field-trial-269.md](2026-05-field-trial-269.md) | tags list limit=15                        | done   | #42          |
| 270 | [2026-05-field-trial-270.md](2026-05-field-trial-270.md) | notes list limit=20                       | done   | #42          |
| 271 | [2026-05-field-trial-271.md](2026-05-field-trial-271.md) | tags list limit=20                        | done   | #42          |
| 272 | [2026-05-field-trial-272.md](2026-05-field-trial-272.md) | notes list limit=25                       | done   | #42          |
| 273 | [2026-05-field-trial-273.md](2026-05-field-trial-273.md) | tags list limit=25                        | done   | #42          |
| 274 | [2026-05-field-trial-274.md](2026-05-field-trial-274.md) | notes list limit=50                       | done   | #42          |
| 275 | [2026-05-field-trial-275.md](2026-05-field-trial-275.md) | tags list limit=50                        | done   | #42          |
| 276 | [2026-05-field-trial-276.md](2026-05-field-trial-276.md) | notes list limit=75                       | done   | #42          |
| 277 | [2026-05-field-trial-277.md](2026-05-field-trial-277.md) | tags list limit=75                        | done   | #42          |
| 278 | [2026-05-field-trial-278.md](2026-05-field-trial-278.md) | notes list limit=99                       | done   | #42          |
| 279 | [2026-05-field-trial-279.md](2026-05-field-trial-279.md) | tags list limit=99                        | done   | #42          |
| 280 | [2026-05-field-trial-280.md](2026-05-field-trial-280.md) | notes list limit=100                      | done   | #42          |
| 281 | [2026-05-field-trial-281.md](2026-05-field-trial-281.md) | tags list limit=100                       | done   | #42          |
| 282 | [2026-05-field-trial-282.md](2026-05-field-trial-282.md) | notes list limit=150                      | done   | #42          |
| 283 | [2026-05-field-trial-283.md](2026-05-field-trial-283.md) | tags list limit=150                       | done   | #42          |
| 284 | [2026-05-field-trial-284.md](2026-05-field-trial-284.md) | notes list limit=200                      | done   | #42          |
| 285 | [2026-05-field-trial-285.md](2026-05-field-trial-285.md) | tags list limit=200                       | done   | #42          |
| 286 | [2026-05-field-trial-286.md](2026-05-field-trial-286.md) | notes list limit=500                      | done   | #42          |
| 287 | [2026-05-field-trial-287.md](2026-05-field-trial-287.md) | tags list limit=500                       | done   | #42          |
| 288 | [2026-05-field-trial-288.md](2026-05-field-trial-288.md) | notes list limit=999                      | done   | #42          |
| 289 | [2026-05-field-trial-289.md](2026-05-field-trial-289.md) | tags list limit=999                       | done   | #42          |
| 290 | [2026-05-field-trial-290.md](2026-05-field-trial-290.md) | notes offset=0                            | done   | #42          |
| 291 | [2026-05-field-trial-291.md](2026-05-field-trial-291.md) | tags offset=0                             | done   | #42          |
| 292 | [2026-05-field-trial-292.md](2026-05-field-trial-292.md) | notes offset=1                            | done   | #42          |
| 293 | [2026-05-field-trial-293.md](2026-05-field-trial-293.md) | tags offset=1                             | done   | #42          |
| 294 | [2026-05-field-trial-294.md](2026-05-field-trial-294.md) | notes offset=2                            | done   | #42          |
| 295 | [2026-05-field-trial-295.md](2026-05-field-trial-295.md) | tags offset=2                             | done   | #42          |
| 296 | [2026-05-field-trial-296.md](2026-05-field-trial-296.md) | notes offset=5                            | done   | #42          |
| 297 | [2026-05-field-trial-297.md](2026-05-field-trial-297.md) | tags offset=5                             | done   | #42          |
| 298 | [2026-05-field-trial-298.md](2026-05-field-trial-298.md) | notes offset=10                           | done   | #42          |
| 299 | [2026-05-field-trial-299.md](2026-05-field-trial-299.md) | tags offset=10                            | done   | #42          |
| 300 | [2026-05-field-trial-300.md](2026-05-field-trial-300.md) | notes offset=20                           | done   | #42          |
| 301 | [2026-05-field-trial-301.md](2026-05-field-trial-301.md) | tags offset=20                            | done   | #42          |
| 302 | [2026-05-field-trial-302.md](2026-05-field-trial-302.md) | notes offset=50                           | done   | #42          |
| 303 | [2026-05-field-trial-303.md](2026-05-field-trial-303.md) | tags offset=50                            | done   | #42          |
| 304 | [2026-05-field-trial-304.md](2026-05-field-trial-304.md) | notes offset=100                          | done   | #42          |
| 305 | [2026-05-field-trial-305.md](2026-05-field-trial-305.md) | tags offset=100                           | done   | #42          |
| 306 | [2026-05-field-trial-306.md](2026-05-field-trial-306.md) | notes offset=500                          | done   | #42          |
| 307 | [2026-05-field-trial-307.md](2026-05-field-trial-307.md) | tags offset=500                           | done   | #42          |
| 308 | [2026-05-field-trial-308.md](2026-05-field-trial-308.md) | notes offset=1000                         | done   | #42          |
| 309 | [2026-05-field-trial-309.md](2026-05-field-trial-309.md) | tags offset=1000                          | done   | #42          |
| 310 | [2026-05-field-trial-310.md](2026-05-field-trial-310.md) | notes offset=9999                         | done   | #42          |
| 311 | [2026-05-field-trial-311.md](2026-05-field-trial-311.md) | tags offset=9999                          | done   | #42          |
| 312 | [2026-05-field-trial-312.md](2026-05-field-trial-312.md) | notes limit+offset combo 0                | done   | #42          |
| 313 | [2026-05-field-trial-313.md](2026-05-field-trial-313.md) | tags limit+offset combo 0                 | done   | #42          |
| 314 | [2026-05-field-trial-314.md](2026-05-field-trial-314.md) | notes limit+offset combo 1                | done   | #42          |
| 315 | [2026-05-field-trial-315.md](2026-05-field-trial-315.md) | tags limit+offset combo 1                 | done   | #42          |
| 316 | [2026-05-field-trial-316.md](2026-05-field-trial-316.md) | notes limit+offset combo 2                | done   | #42          |
| 317 | [2026-05-field-trial-317.md](2026-05-field-trial-317.md) | tags limit+offset combo 2                 | done   | #42          |
| 318 | [2026-05-field-trial-318.md](2026-05-field-trial-318.md) | notes limit+offset combo 3                | done   | #42          |
| 319 | [2026-05-field-trial-319.md](2026-05-field-trial-319.md) | tags limit+offset combo 3                 | done   | #42          |
| 320 | [2026-05-field-trial-320.md](2026-05-field-trial-320.md) | notes limit+offset combo 4                | done   | #42          |
| 321 | [2026-05-field-trial-321.md](2026-05-field-trial-321.md) | tags limit+offset combo 4                 | done   | #42          |
| 322 | [2026-05-field-trial-322.md](2026-05-field-trial-322.md) | notes limit+offset combo 5                | done   | #42          |
| 323 | [2026-05-field-trial-323.md](2026-05-field-trial-323.md) | tags limit+offset combo 5                 | done   | #42          |
| 324 | [2026-05-field-trial-324.md](2026-05-field-trial-324.md) | notes limit+offset combo 6                | done   | #42          |
| 325 | [2026-05-field-trial-325.md](2026-05-field-trial-325.md) | tags limit+offset combo 6                 | done   | #42          |
| 326 | [2026-05-field-trial-326.md](2026-05-field-trial-326.md) | notes limit+offset combo 7                | done   | #42          |
| 327 | [2026-05-field-trial-327.md](2026-05-field-trial-327.md) | tags limit+offset combo 7                 | done   | #42          |
| 328 | [2026-05-field-trial-328.md](2026-05-field-trial-328.md) | notes limit+offset combo 8                | done   | #42          |
| 329 | [2026-05-field-trial-329.md](2026-05-field-trial-329.md) | tags limit+offset combo 8                 | done   | #42          |
| 330 | [2026-05-field-trial-330.md](2026-05-field-trial-330.md) | notes limit+offset combo 9                | done   | #42          |
| 331 | [2026-05-field-trial-331.md](2026-05-field-trial-331.md) | tags limit+offset combo 9                 | done   | #42          |
| 332 | [2026-05-field-trial-332.md](2026-05-field-trial-332.md) | notes limit+offset combo 10               | done   | #42          |
| 333 | [2026-05-field-trial-333.md](2026-05-field-trial-333.md) | tags limit+offset combo 10                | done   | #42          |
| 334 | [2026-05-field-trial-334.md](2026-05-field-trial-334.md) | notes limit+offset combo 11               | done   | #42          |
| 335 | [2026-05-field-trial-335.md](2026-05-field-trial-335.md) | tags limit+offset combo 11                | done   | #42          |
| 336 | [2026-05-field-trial-336.md](2026-05-field-trial-336.md) | notes limit+offset combo 12               | done   | #42          |
| 337 | [2026-05-field-trial-337.md](2026-05-field-trial-337.md) | tags limit+offset combo 12                | done   | #42          |
| 338 | [2026-05-field-trial-338.md](2026-05-field-trial-338.md) | notes limit+offset combo 13               | done   | #42          |
| 339 | [2026-05-field-trial-339.md](2026-05-field-trial-339.md) | tags limit+offset combo 13                | done   | #42          |
| 340 | [2026-05-field-trial-340.md](2026-05-field-trial-340.md) | notes limit+offset combo 14               | done   | #42          |
| 341 | [2026-05-field-trial-341.md](2026-05-field-trial-341.md) | tags limit+offset combo 14                | done   | #42          |
| 342 | [2026-05-field-trial-342.md](2026-05-field-trial-342.md) | notes limit+offset combo 15               | done   | #42          |
| 343 | [2026-05-field-trial-343.md](2026-05-field-trial-343.md) | tags limit+offset combo 15                | done   | #42          |
| 344 | [2026-05-field-trial-344.md](2026-05-field-trial-344.md) | notes limit+offset combo 16               | done   | #42          |
| 345 | [2026-05-field-trial-345.md](2026-05-field-trial-345.md) | tags limit+offset combo 16                | done   | #42          |
| 346 | [2026-05-field-trial-346.md](2026-05-field-trial-346.md) | notes limit+offset combo 17               | done   | #42          |
| 347 | [2026-05-field-trial-347.md](2026-05-field-trial-347.md) | tags limit+offset combo 17                | done   | #42          |
| 348 | [2026-05-field-trial-348.md](2026-05-field-trial-348.md) | notes limit+offset combo 18               | done   | #42          |
| 349 | [2026-05-field-trial-349.md](2026-05-field-trial-349.md) | tags limit+offset combo 18                | done   | #42          |
| 350 | [2026-05-field-trial-350.md](2026-05-field-trial-350.md) | notes limit+offset combo 19               | done   | #42          |
| 351 | [2026-05-field-trial-351.md](2026-05-field-trial-351.md) | tags limit+offset combo 19                | done   | #42          |
| 352 | [2026-05-field-trial-352.md](2026-05-field-trial-352.md) | getNote path id=1                         | done   | #42          |
| 353 | [2026-05-field-trial-353.md](2026-05-field-trial-353.md) | updateNote id=1                           | done   | #42          |
| 354 | [2026-05-field-trial-354.md](2026-05-field-trial-354.md) | deleteNote id=1                           | done   | #42          |
| 355 | [2026-05-field-trial-355.md](2026-05-field-trial-355.md) | getNote path id=2                         | done   | #42          |
| 356 | [2026-05-field-trial-356.md](2026-05-field-trial-356.md) | updateNote id=2                           | done   | #42          |
| 357 | [2026-05-field-trial-357.md](2026-05-field-trial-357.md) | deleteNote id=2                           | done   | #42          |
| 358 | [2026-05-field-trial-358.md](2026-05-field-trial-358.md) | getNote path id=7                         | done   | #42          |
| 359 | [2026-05-field-trial-359.md](2026-05-field-trial-359.md) | updateNote id=7                           | done   | #42          |
| 360 | [2026-05-field-trial-360.md](2026-05-field-trial-360.md) | deleteNote id=7                           | done   | #42          |
| 361 | [2026-05-field-trial-361.md](2026-05-field-trial-361.md) | getNote path id=42                        | done   | #42          |
| 362 | [2026-05-field-trial-362.md](2026-05-field-trial-362.md) | updateNote id=42                          | done   | #42          |
| 363 | [2026-05-field-trial-363.md](2026-05-field-trial-363.md) | deleteNote id=42                          | done   | #42          |
| 364 | [2026-05-field-trial-364.md](2026-05-field-trial-364.md) | getNote path id=99                        | done   | #42          |
| 365 | [2026-05-field-trial-365.md](2026-05-field-trial-365.md) | updateNote id=99                          | done   | #42          |
| 366 | [2026-05-field-trial-366.md](2026-05-field-trial-366.md) | deleteNote id=99                          | done   | #42          |
| 367 | [2026-05-field-trial-367.md](2026-05-field-trial-367.md) | getNote path id=100                       | done   | #42          |
| 368 | [2026-05-field-trial-368.md](2026-05-field-trial-368.md) | updateNote id=100                         | done   | #42          |
| 369 | [2026-05-field-trial-369.md](2026-05-field-trial-369.md) | deleteNote id=100                         | done   | #42          |
| 370 | [2026-05-field-trial-370.md](2026-05-field-trial-370.md) | getNote path id=999                       | done   | #42          |
| 371 | [2026-05-field-trial-371.md](2026-05-field-trial-371.md) | updateNote id=999                         | done   | #42          |
| 372 | [2026-05-field-trial-372.md](2026-05-field-trial-372.md) | deleteNote id=999                         | done   | #42          |
| 373 | [2026-05-field-trial-373.md](2026-05-field-trial-373.md) | getNote path id=10000                     | done   | #42          |
| 374 | [2026-05-field-trial-374.md](2026-05-field-trial-374.md) | updateNote id=10000                       | done   | #42          |
| 375 | [2026-05-field-trial-375.md](2026-05-field-trial-375.md) | deleteNote id=10000                       | done   | #42          |
| 376 | [2026-05-field-trial-376.md](2026-05-field-trial-376.md) | getNote path id=2147483646                | done   | #42          |
| 377 | [2026-05-field-trial-377.md](2026-05-field-trial-377.md) | updateNote id=2147483646                  | done   | #42          |
| 378 | [2026-05-field-trial-378.md](2026-05-field-trial-378.md) | deleteNote id=2147483646                  | done   | #42          |
| 379 | [2026-05-field-trial-379.md](2026-05-field-trial-379.md) | getTag id=1                               | done   | #42          |
| 380 | [2026-05-field-trial-380.md](2026-05-field-trial-380.md) | getTag id=3                               | done   | #42          |
| 381 | [2026-05-field-trial-381.md](2026-05-field-trial-381.md) | getTag id=8                               | done   | #42          |
| 382 | [2026-05-field-trial-382.md](2026-05-field-trial-382.md) | getTag id=55                              | done   | #42          |
| 383 | [2026-05-field-trial-383.md](2026-05-field-trial-383.md) | getTag id=200                             | done   | #42          |
| 384 | [2026-05-field-trial-384.md](2026-05-field-trial-384.md) | getTag id=9999                            | done   | #42          |
| 385 | [2026-05-field-trial-385.md](2026-05-field-trial-385.md) | validation field index 0                  | done   | #42          |
| 386 | [2026-05-field-trial-386.md](2026-05-field-trial-386.md) | validation field index 1                  | done   | #42          |
| 387 | [2026-05-field-trial-387.md](2026-05-field-trial-387.md) | validation field index 2                  | done   | #42          |
| 388 | [2026-05-field-trial-388.md](2026-05-field-trial-388.md) | validation field index 3                  | done   | #42          |
| 389 | [2026-05-field-trial-389.md](2026-05-field-trial-389.md) | validation field index 4                  | done   | #42          |
| 390 | [2026-05-field-trial-390.md](2026-05-field-trial-390.md) | validation field index 5                  | done   | #42          |
| 391 | [2026-05-field-trial-391.md](2026-05-field-trial-391.md) | validation field index 6                  | done   | #42          |
| 392 | [2026-05-field-trial-392.md](2026-05-field-trial-392.md) | validation field index 7                  | done   | #42          |
| 393 | [2026-05-field-trial-393.md](2026-05-field-trial-393.md) | validation field index 8                  | done   | #42          |
| 394 | [2026-05-field-trial-394.md](2026-05-field-trial-394.md) | validation field index 9                  | done   | #42          |
| 395 | [2026-05-field-trial-395.md](2026-05-field-trial-395.md) | validation field index 10                 | done   | #42          |
| 396 | [2026-05-field-trial-396.md](2026-05-field-trial-396.md) | validation field index 11                 | done   | #42          |
| 397 | [2026-05-field-trial-397.md](2026-05-field-trial-397.md) | validation field index 12                 | done   | #42          |
| 398 | [2026-05-field-trial-398.md](2026-05-field-trial-398.md) | validation field index 13                 | done   | #42          |
| 399 | [2026-05-field-trial-399.md](2026-05-field-trial-399.md) | validation field index 14                 | done   | #42          |
| 400 | [2026-05-field-trial-400.md](2026-05-field-trial-400.md) | validation field index 15                 | done   | #42          |
| 401 | [2026-05-field-trial-401.md](2026-05-field-trial-401.md) | validation field index 16                 | done   | #42          |
| 402 | [2026-05-field-trial-402.md](2026-05-field-trial-402.md) | validation field index 17                 | done   | #42          |
| 403 | [2026-05-field-trial-403.md](2026-05-field-trial-403.md) | validation field index 18                 | done   | #42          |
| 404 | [2026-05-field-trial-404.md](2026-05-field-trial-404.md) | validation field index 19                 | done   | #42          |
| 405 | [2026-05-field-trial-405.md](2026-05-field-trial-405.md) | validation field index 20                 | done   | #42          |
| 406 | [2026-05-field-trial-406.md](2026-05-field-trial-406.md) | validation field index 21                 | done   | #42          |
| 407 | [2026-05-field-trial-407.md](2026-05-field-trial-407.md) | validation field index 22                 | done   | #42          |
| 408 | [2026-05-field-trial-408.md](2026-05-field-trial-408.md) | validation field index 23                 | done   | #42          |
| 409 | [2026-05-field-trial-409.md](2026-05-field-trial-409.md) | validation field index 24                 | done   | #42          |
| 410 | [2026-05-field-trial-410.md](2026-05-field-trial-410.md) | parseProblemDetails case 0                | done   | #42          |
| 411 | [2026-05-field-trial-411.md](2026-05-field-trial-411.md) | parseProblemDetails case 1                | done   | #42          |
| 412 | [2026-05-field-trial-412.md](2026-05-field-trial-412.md) | parseProblemDetails case 2                | done   | #42          |
| 413 | [2026-05-field-trial-413.md](2026-05-field-trial-413.md) | parseProblemDetails case 3                | done   | #42          |
| 414 | [2026-05-field-trial-414.md](2026-05-field-trial-414.md) | parseProblemDetails case 4                | done   | #42          |
| 415 | [2026-05-field-trial-415.md](2026-05-field-trial-415.md) | parseProblemDetails case 5                | done   | #42          |
| 416 | [2026-05-field-trial-416.md](2026-05-field-trial-416.md) | parseProblemDetails case 6                | done   | #42          |
| 417 | [2026-05-field-trial-417.md](2026-05-field-trial-417.md) | parseProblemDetails case 7                | done   | #42          |
| 418 | [2026-05-field-trial-418.md](2026-05-field-trial-418.md) | parseProblemDetails case 8                | done   | #42          |
| 419 | [2026-05-field-trial-419.md](2026-05-field-trial-419.md) | parseProblemDetails case 9                | done   | #42          |
| 420 | [2026-05-field-trial-420.md](2026-05-field-trial-420.md) | parseProblemDetails case 10               | done   | #42          |
| 421 | [2026-05-field-trial-421.md](2026-05-field-trial-421.md) | parseProblemDetails case 11               | done   | #42          |
| 422 | [2026-05-field-trial-422.md](2026-05-field-trial-422.md) | parseProblemDetails case 12               | done   | #42          |
| 423 | [2026-05-field-trial-423.md](2026-05-field-trial-423.md) | parseProblemDetails case 13               | done   | #42          |
| 424 | [2026-05-field-trial-424.md](2026-05-field-trial-424.md) | parseProblemDetails case 14               | done   | #42          |
| 425 | [2026-05-field-trial-425.md](2026-05-field-trial-425.md) | parseProblemDetails case 15               | done   | #42          |
| 426 | [2026-05-field-trial-426.md](2026-05-field-trial-426.md) | parseProblemDetails case 16               | done   | #42          |
| 427 | [2026-05-field-trial-427.md](2026-05-field-trial-427.md) | parseProblemDetails case 17               | done   | #42          |
| 428 | [2026-05-field-trial-428.md](2026-05-field-trial-428.md) | parseProblemDetails case 18               | done   | #42          |
| 429 | [2026-05-field-trial-429.md](2026-05-field-trial-429.md) | parseProblemDetails case 19               | done   | #42          |
| 430 | [2026-05-field-trial-430.md](2026-05-field-trial-430.md) | baseUrl variant 0                         | done   | #42          |
| 431 | [2026-05-field-trial-431.md](2026-05-field-trial-431.md) | baseUrl variant 1                         | done   | #42          |
| 432 | [2026-05-field-trial-432.md](2026-05-field-trial-432.md) | baseUrl variant 2                         | done   | #42          |
| 433 | [2026-05-field-trial-433.md](2026-05-field-trial-433.md) | baseUrl variant 3                         | done   | #42          |
| 434 | [2026-05-field-trial-434.md](2026-05-field-trial-434.md) | baseUrl variant 4                         | done   | #42          |
| 435 | [2026-05-field-trial-435.md](2026-05-field-trial-435.md) | auth header combo 0                       | done   | #42          |
| 436 | [2026-05-field-trial-436.md](2026-05-field-trial-436.md) | auth header combo 1                       | done   | #42          |
| 437 | [2026-05-field-trial-437.md](2026-05-field-trial-437.md) | auth header combo 2                       | done   | #42          |
| 438 | [2026-05-field-trial-438.md](2026-05-field-trial-438.md) | auth header combo 3                       | done   | #42          |
| 439 | [2026-05-field-trial-439.md](2026-05-field-trial-439.md) | auth header combo 4                       | done   | #42          |
| 440 | [2026-05-field-trial-440.md](2026-05-field-trial-440.md) | auth header combo 5                       | done   | #42          |
| 441 | [2026-05-field-trial-441.md](2026-05-field-trial-441.md) | auth header combo 6                       | done   | #42          |
| 442 | [2026-05-field-trial-442.md](2026-05-field-trial-442.md) | auth header combo 7                       | done   | #42          |
| 443 | [2026-05-field-trial-443.md](2026-05-field-trial-443.md) | auth header combo 8                       | done   | #42          |
| 444 | [2026-05-field-trial-444.md](2026-05-field-trial-444.md) | auth header combo 9                       | done   | #42          |
| 445 | [2026-05-field-trial-445.md](2026-05-field-trial-445.md) | auth header combo 10                      | done   | #42          |
| 446 | [2026-05-field-trial-446.md](2026-05-field-trial-446.md) | auth header combo 11                      | done   | #42          |
| 447 | [2026-05-field-trial-447.md](2026-05-field-trial-447.md) | auth header combo 12                      | done   | #42          |
| 448 | [2026-05-field-trial-448.md](2026-05-field-trial-448.md) | auth header combo 13                      | done   | #42          |
| 449 | [2026-05-field-trial-449.md](2026-05-field-trial-449.md) | auth header combo 14                      | done   | #42          |
| 450 | [2026-05-field-trial-450.md](2026-05-field-trial-450.md) | parallel calls batch 0                    | done   | #42          |
| 451 | [2026-05-field-trial-451.md](2026-05-field-trial-451.md) | parallel calls batch 1                    | done   | #42          |
| 452 | [2026-05-field-trial-452.md](2026-05-field-trial-452.md) | parallel calls batch 2                    | done   | #42          |
| 453 | [2026-05-field-trial-453.md](2026-05-field-trial-453.md) | parallel calls batch 3                    | done   | #42          |
| 454 | [2026-05-field-trial-454.md](2026-05-field-trial-454.md) | parallel calls batch 4                    | done   | #42          |
| 455 | [2026-05-field-trial-455.md](2026-05-field-trial-455.md) | parallel calls batch 5                    | done   | #42          |
| 456 | [2026-05-field-trial-456.md](2026-05-field-trial-456.md) | parallel calls batch 6                    | done   | #42          |
| 457 | [2026-05-field-trial-457.md](2026-05-field-trial-457.md) | parallel calls batch 7                    | done   | #42          |
| 458 | [2026-05-field-trial-458.md](2026-05-field-trial-458.md) | parallel calls batch 8                    | done   | #42          |
| 459 | [2026-05-field-trial-459.md](2026-05-field-trial-459.md) | parallel calls batch 9                    | done   | #42          |
| 460 | [2026-05-field-trial-460.md](2026-05-field-trial-460.md) | parallel calls batch 10                   | done   | #42          |
| 461 | [2026-05-field-trial-461.md](2026-05-field-trial-461.md) | parallel calls batch 11                   | done   | #42          |
| 462 | [2026-05-field-trial-462.md](2026-05-field-trial-462.md) | generated schema probe 0                  | done   | #42          |
| 463 | [2026-05-field-trial-463.md](2026-05-field-trial-463.md) | generated schema probe 1                  | done   | #42          |
| 464 | [2026-05-field-trial-464.md](2026-05-field-trial-464.md) | generated schema probe 2                  | done   | #42          |
| 465 | [2026-05-field-trial-465.md](2026-05-field-trial-465.md) | generated schema probe 3                  | done   | #42          |
| 466 | [2026-05-field-trial-466.md](2026-05-field-trial-466.md) | generated schema probe 4                  | done   | #42          |
| 467 | [2026-05-field-trial-467.md](2026-05-field-trial-467.md) | generated schema probe 5                  | done   | #42          |
| 468 | [2026-05-field-trial-468.md](2026-05-field-trial-468.md) | generated schema probe 6                  | done   | #42          |
| 469 | [2026-05-field-trial-469.md](2026-05-field-trial-469.md) | generated schema probe 7                  | done   | #42          |
| 470 | [2026-05-field-trial-470.md](2026-05-field-trial-470.md) | generated schema probe 8                  | done   | #42          |
| 471 | [2026-05-field-trial-471.md](2026-05-field-trial-471.md) | generated schema probe 9                  | done   | #42          |
| 472 | [2026-05-field-trial-472.md](2026-05-field-trial-472.md) | fixture load not-found                    | done   | #42          |
| 473 | [2026-05-field-trial-473.md](2026-05-field-trial-473.md) | fixture load validation-failed            | done   | #42          |
| 474 | [2026-05-field-trial-474.md](2026-05-field-trial-474.md) | fixture load payload-too-large            | done   | #42          |
| 475 | [2026-05-field-trial-475.md](2026-05-field-trial-475.md) | fixture load health-ok                    | done   | #42          |
| 476 | [2026-05-field-trial-476.md](2026-05-field-trial-476.md) | fixture load ping-ok                      | done   | #42          |
| 477 | [2026-05-field-trial-477.md](2026-05-field-trial-477.md) | fixture load note-ok                      | done   | #42          |
| 478 | [2026-05-field-trial-478.md](2026-05-field-trial-478.md) | fixture load tag-ok                       | done   | #42          |
| 479 | [2026-05-field-trial-479.md](2026-05-field-trial-479.md) | content-type variant 0                    | done   | #42          |
| 480 | [2026-05-field-trial-480.md](2026-05-field-trial-480.md) | content-type variant 1                    | done   | #42          |
| 481 | [2026-05-field-trial-481.md](2026-05-field-trial-481.md) | content-type variant 2                    | done   | #42          |
| 482 | [2026-05-field-trial-482.md](2026-05-field-trial-482.md) | content-type variant 3                    | done   | #42          |
| 483 | [2026-05-field-trial-483.md](2026-05-field-trial-483.md) | content-type variant 4                    | done   | #42          |
| 484 | [2026-05-field-trial-484.md](2026-05-field-trial-484.md) | content-type variant 5                    | done   | #42          |
| 485 | [2026-05-field-trial-485.md](2026-05-field-trial-485.md) | content-type variant 6                    | done   | #42          |
| 486 | [2026-05-field-trial-486.md](2026-05-field-trial-486.md) | content-type variant 7                    | done   | #42          |
| 487 | [2026-05-field-trial-487.md](2026-05-field-trial-487.md) | replay health_ok #0                       | done   | #42          |
| 488 | [2026-05-field-trial-488.md](2026-05-field-trial-488.md) | replay ping_ok #1                         | done   | #42          |
| 489 | [2026-05-field-trial-489.md](2026-05-field-trial-489.md) | replay smoke_ok #2                        | done   | #42          |
| 490 | [2026-05-field-trial-490.md](2026-05-field-trial-490.md) | replay notes_list #3                      | done   | #42          |
| 491 | [2026-05-field-trial-491.md](2026-05-field-trial-491.md) | replay tags_list #4                       | done   | #42          |
| 492 | [2026-05-field-trial-492.md](2026-05-field-trial-492.md) | replay protected_ok #5                    | done   | #42          |
| 493 | [2026-05-field-trial-493.md](2026-05-field-trial-493.md) | replay err_422 #6                         | done   | #42          |
| 494 | [2026-05-field-trial-494.md](2026-05-field-trial-494.md) | replay prob_is_pd #7                      | done   | #42          |
| 495 | [2026-05-field-trial-495.md](2026-05-field-trial-495.md) | replay vdx_by_field #8                    | done   | #42          |
| 496 | [2026-05-field-trial-496.md](2026-05-field-trial-496.md) | replay machine_ok #9                      | done   | #42          |
| 497 | [2026-05-field-trial-497.md](2026-05-field-trial-497.md) | replay health_ok #10                      | done   | #42          |
| 498 | [2026-05-field-trial-498.md](2026-05-field-trial-498.md) | replay ping_ok #11                        | done   | #42          |
| 499 | [2026-05-field-trial-499.md](2026-05-field-trial-499.md) | replay smoke_ok #12                       | done   | #42          |
| 500 | [2026-05-field-trial-500.md](2026-05-field-trial-500.md) | replay notes_list #13                     | done   | #42          |
| 501 | [2026-05-field-trial-501.md](2026-05-field-trial-501.md) | replay tags_list #14                      | done   | #42          |
| 502 | [2026-05-field-trial-502.md](2026-05-field-trial-502.md) | replay protected_ok #15                   | done   | #42          |
| 503 | [2026-05-field-trial-503.md](2026-05-field-trial-503.md) | replay err_422 #16                        | done   | #42          |
| 504 | [2026-05-field-trial-504.md](2026-05-field-trial-504.md) | replay prob_is_pd #17                     | done   | #42          |
| 505 | [2026-05-field-trial-505.md](2026-05-field-trial-505.md) | replay vdx_by_field #18                   | done   | #42          |
| 506 | [2026-05-field-trial-506.md](2026-05-field-trial-506.md) | replay machine_ok #19                     | done   | #42          |
| 507 | [2026-05-field-trial-507.md](2026-05-field-trial-507.md) | replay health_ok #20                      | done   | #42          |
| 508 | [2026-05-field-trial-508.md](2026-05-field-trial-508.md) | replay ping_ok #21                        | done   | #42          |
| 509 | [2026-05-field-trial-509.md](2026-05-field-trial-509.md) | replay smoke_ok #22                       | done   | #42          |
| 510 | [2026-05-field-trial-510.md](2026-05-field-trial-510.md) | replay notes_list #23                     | done   | #42          |
| 511 | [2026-05-field-trial-511.md](2026-05-field-trial-511.md) | replay tags_list #24                      | done   | #42          |
| 512 | [2026-05-field-trial-512.md](2026-05-field-trial-512.md) | replay protected_ok #25                   | done   | #42          |
| 513 | [2026-05-field-trial-513.md](2026-05-field-trial-513.md) | replay err_422 #26                        | done   | #42          |
| 514 | [2026-05-field-trial-514.md](2026-05-field-trial-514.md) | replay prob_is_pd #27                     | done   | #42          |
| 515 | [2026-05-field-trial-515.md](2026-05-field-trial-515.md) | replay vdx_by_field #28                   | done   | #42          |
| 516 | [2026-05-field-trial-516.md](2026-05-field-trial-516.md) | replay machine_ok #29                     | done   | #42          |
| 517 | [2026-05-field-trial-517.md](2026-05-field-trial-517.md) | misc client probe 0                       | done   | #42          |
| 518 | [2026-05-field-trial-518.md](2026-05-field-trial-518.md) | misc client probe 1                       | done   | #42          |
| 519 | [2026-05-field-trial-519.md](2026-05-field-trial-519.md) | misc client probe 2                       | done   | #42          |
| 520 | [2026-05-field-trial-520.md](2026-05-field-trial-520.md) | misc client probe 3                       | done   | #42          |
| 521 | [2026-05-field-trial-521.md](2026-05-field-trial-521.md) | misc client probe 4                       | done   | #42          |
| 522 | [2026-05-field-trial-522.md](2026-05-field-trial-522.md) | misc client probe 5                       | done   | #42          |
| 523 | [2026-05-field-trial-523.md](2026-05-field-trial-523.md) | misc client probe 6                       | done   | #42          |
| 524 | [2026-05-field-trial-524.md](2026-05-field-trial-524.md) | misc client probe 7                       | done   | #42          |
| 525 | [2026-05-field-trial-525.md](2026-05-field-trial-525.md) | misc client probe 8                       | done   | #42          |
| 526 | [2026-05-field-trial-526.md](2026-05-field-trial-526.md) | misc client probe 9                       | done   | #42          |
| 527 | [2026-05-field-trial-527.md](2026-05-field-trial-527.md) | misc client probe 10                      | done   | #42          |
| 528 | [2026-05-field-trial-528.md](2026-05-field-trial-528.md) | misc client probe 11                      | done   | #42          |
| 529 | [2026-05-field-trial-529.md](2026-05-field-trial-529.md) | misc client probe 12                      | done   | #42          |

**`done`** = friction resolution cycle complete. Marathon: FT30–129 [#31](https://github.com/hideyukiMORI/nene2-js/issues/31), FT130–229 [#45](https://github.com/hideyukiMORI/nene2-js/issues/45), FT230–529 [#42](https://github.com/hideyukiMORI/nene2-js/issues/42). Reports follow [field-trial-report.md](../templates/field-trial-report.md). Run `npm run test:ft-marathon`.
