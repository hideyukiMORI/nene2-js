# Field trials index

Client-library field trials for [nene2-js](https://github.com/hideyukiMORI/nene2-js).  
Methodology: `docs/development/field-trials.md` · Template: `docs/templates/field-trial-report.md` · Friction cycle: [ADR 0004](../adr/0004-field-trial-friction-resolution-cycle.md)

| FT  | Report | Theme | Status | Friction |
| --- | ------ | ----- | ------ | -------- |
| 1   | [2026-05-field-trial-1.md](2026-05-field-trial-1.md)     | OpenAPI pin + Problem Details             | done   | in report |
| 2   | [2026-05-field-trial-2.md](2026-05-field-trial-2.md)     | `createNene2Client` health / ping         | done   | in report |
| 3   | [2026-05-field-trial-3.md](2026-05-field-trial-3.md)     | Example notes + degraded health           | done   | #16 #17   |
| 4   | [2026-05-field-trial-4.md](2026-05-field-trial-4.md)     | `getProtected` + bearer                   | done   | #19       |
| 5   | [2026-05-field-trial-5.md](2026-05-field-trial-5.md)     | Note update/delete + evac ports           | done   | #21       |
| 6   | [2026-05-field-trial-6.md](2026-05-field-trial-6.md)     | Example tags CRUD                         | done   | #23       |
| 7   | [2026-05-field-trial-7.md](2026-05-field-trial-7.md)     | Live JWT `getProtected`                   | done   | #25       |
| 8   | [2026-05-field-trial-8.md](2026-05-field-trial-8.md)     | Live notes CRUD                           | done   | #26       |
| 9   | [2026-05-field-trial-9.md](2026-05-field-trial-9.md)     | Live tags CRUD                            | done   | #27       |
| 10  | [2026-05-field-trial-10.md](2026-05-field-trial-10.md)   | `frameworkSmoke`                          | done   | #30       |
| 11  | [2026-05-field-trial-11.md](2026-05-field-trial-11.md)   | `machineHealth`                           | done   | #30       |
| 12  | [2026-05-field-trial-12.md](2026-05-field-trial-12.md)   | `smoke()` helper                          | done   | #30       |
| 13  | [2026-05-field-trial-13.md](2026-05-field-trial-13.md)   | `AbortSignal`                             | done   | #30       |
| 14  | [2026-05-field-trial-14.md](2026-05-field-trial-14.md)   | Validation error helpers                  | done   | #30       |
| 15  | [2026-05-field-trial-15.md](2026-05-field-trial-15.md)   | HTML JSON hint                            | done   | #30       |
| 16  | [2026-05-field-trial-16.md](2026-05-field-trial-16.md)   | Live frameworkSmoke                       | done   | #30       |
| 17  | [2026-05-field-trial-17.md](2026-05-field-trial-17.md)   | Live machineHealth                        | done   | #30       |
| 18  | [2026-05-field-trial-18.md](2026-05-field-trial-18.md)   | Live 422 validation                       | done   | #30       |
| 19  | [2026-05-field-trial-19.md](2026-05-field-trial-19.md)   | consume-client howto                      | done   | #30       |
| 20  | [2026-05-field-trial-20.md](2026-05-field-trial-20.md)   | baseUrl trailing slash                    | done   | #30       |
| 21  | [2026-05-field-trial-21.md](2026-05-field-trial-21.md)   | Parallel list endpoints                   | done   | #30       |
| 22  | [2026-05-field-trial-22.md](2026-05-field-trial-22.md)   | Export surface                            | done   | #30       |
| 23  | [2026-05-field-trial-23.md](2026-05-field-trial-23.md)   | Evac machine API key                      | done   | #30       |
| 24  | [2026-05-field-trial-24.md](2026-05-field-trial-24.md)   | README `smoke()`                          | done   | #30       |
| 25  | [2026-05-field-trial-25.md](2026-05-field-trial-25.md)   | Evac live script                          | done   | #30       |
| 26  | [2026-05-field-trial-26.md](2026-05-field-trial-26.md)   | Tags delete 404                           | done   | #30       |
| 27  | [2026-05-field-trial-27.md](2026-05-field-trial-27.md)   | Protected 401                             | done   | #30       |
| 28  | [2026-05-field-trial-28.md](2026-05-field-trial-28.md)   | contracts:check in loop                   | done   | #30       |
| 29  | [2026-05-field-trial-29.md](2026-05-field-trial-29.md)   | Marathon INDEX                            | done   | #30       |
| 30  | [2026-05-field-trial-30.md](2026-05-field-trial-30.md) | health 200 ok | done | #31 |
| 31  | [2026-05-field-trial-31.md](2026-05-field-trial-31.md) | health 503 throw default | done | #31 |
| 32  | [2026-05-field-trial-32.md](2026-05-field-trial-32.md) | health 503 allowDegraded | done | #31 |
| 33  | [2026-05-field-trial-33.md](2026-05-field-trial-33.md) | health checks map ok | done | #31 |
| 34  | [2026-05-field-trial-34.md](2026-05-field-trial-34.md) | health service must be NENE2 | done | #31 |
| 35  | [2026-05-field-trial-35.md](2026-05-field-trial-35.md) | health invalid shape | done | #31 |
| 36  | [2026-05-field-trial-36.md](2026-05-field-trial-36.md) | health html wrong port | done | #31 |
| 37  | [2026-05-field-trial-37.md](2026-05-field-trial-37.md) | health 500 problem | done | #31 |
| 38  | [2026-05-field-trial-38.md](2026-05-field-trial-38.md) | frameworkSmoke GET / | done | #31 |
| 39  | [2026-05-field-trial-39.md](2026-05-field-trial-39.md) | ping pong | done | #31 |
| 40  | [2026-05-field-trial-40.md](2026-05-field-trial-40.md) | smoke parallel | done | #31 |
| 41  | [2026-05-field-trial-41.md](2026-05-field-trial-41.md) | machineHealth 200 | done | #31 |
| 42  | [2026-05-field-trial-42.md](2026-05-field-trial-42.md) | machineHealth 401 | done | #31 |
| 43  | [2026-05-field-trial-43.md](2026-05-field-trial-43.md) | framework bad status | done | #31 |
| 44  | [2026-05-field-trial-44.md](2026-05-field-trial-44.md) | ping bad message | done | #31 |
| 45  | [2026-05-field-trial-45.md](2026-05-field-trial-45.md) | listNotes | done | #31 |
| 46  | [2026-05-field-trial-46.md](2026-05-field-trial-46.md) | listNotes query | done | #31 |
| 47  | [2026-05-field-trial-47.md](2026-05-field-trial-47.md) | getNote | done | #31 |
| 48  | [2026-05-field-trial-48.md](2026-05-field-trial-48.md) | createNote | done | #31 |
| 49  | [2026-05-field-trial-49.md](2026-05-field-trial-49.md) | updateNote | done | #31 |
| 50  | [2026-05-field-trial-50.md](2026-05-field-trial-50.md) | deleteNote | done | #31 |
| 51  | [2026-05-field-trial-51.md](2026-05-field-trial-51.md) | getNote 404 | done | #31 |
| 52  | [2026-05-field-trial-52.md](2026-05-field-trial-52.md) | createNote 422 | done | #31 |
| 53  | [2026-05-field-trial-53.md](2026-05-field-trial-53.md) | createNote POST body | done | #31 |
| 54  | [2026-05-field-trial-54.md](2026-05-field-trial-54.md) | update path | done | #31 |
| 55  | [2026-05-field-trial-55.md](2026-05-field-trial-55.md) | delete path | done | #31 |
| 56  | [2026-05-field-trial-56.md](2026-05-field-trial-56.md) | listTags | done | #31 |
| 57  | [2026-05-field-trial-57.md](2026-05-field-trial-57.md) | listTags query | done | #31 |
| 58  | [2026-05-field-trial-58.md](2026-05-field-trial-58.md) | getTag | done | #31 |
| 59  | [2026-05-field-trial-59.md](2026-05-field-trial-59.md) | createTag | done | #31 |
| 60  | [2026-05-field-trial-60.md](2026-05-field-trial-60.md) | updateTag | done | #31 |
| 61  | [2026-05-field-trial-61.md](2026-05-field-trial-61.md) | deleteTag | done | #31 |
| 62  | [2026-05-field-trial-62.md](2026-05-field-trial-62.md) | getTag 404 | done | #31 |
| 63  | [2026-05-field-trial-63.md](2026-05-field-trial-63.md) | createTag body | done | #31 |
| 64  | [2026-05-field-trial-64.md](2026-05-field-trial-64.md) | update path | done | #31 |
| 65  | [2026-05-field-trial-65.md](2026-05-field-trial-65.md) | delete path | done | #31 |
| 66  | [2026-05-field-trial-66.md](2026-05-field-trial-66.md) | getProtected ok | done | #31 |
| 67  | [2026-05-field-trial-67.md](2026-05-field-trial-67.md) | getProtected 401 | done | #31 |
| 68  | [2026-05-field-trial-68.md](2026-05-field-trial-68.md) | bearer header | done | #31 |
| 69  | [2026-05-field-trial-69.md](2026-05-field-trial-69.md) | invalid jwt | done | #31 |
| 70  | [2026-05-field-trial-70.md](2026-05-field-trial-70.md) | claims sub | done | #31 |
| 71  | [2026-05-field-trial-71.md](2026-05-field-trial-71.md) | welcome message | done | #31 |
| 72  | [2026-05-field-trial-72.md](2026-05-field-trial-72.md) | apiKey machine | done | #31 |
| 73  | [2026-05-field-trial-73.md](2026-05-field-trial-73.md) | bearer protected | done | #31 |
| 74  | [2026-05-field-trial-74.md](2026-05-field-trial-74.md) | both headers | done | #31 |
| 75  | [2026-05-field-trial-75.md](2026-05-field-trial-75.md) | X-NENE2-API-Key name | done | #31 |
| 76  | [2026-05-field-trial-76.md](2026-05-field-trial-76.md) | Authorization Bearer | done | #31 |
| 77  | [2026-05-field-trial-77.md](2026-05-field-trial-77.md) | public no auth | done | #31 |
| 78  | [2026-05-field-trial-78.md](2026-05-field-trial-78.md) | no apiKey on health | done | #31 |
| 79  | [2026-05-field-trial-79.md](2026-05-field-trial-79.md) | trailing slash | done | #31 |
| 80  | [2026-05-field-trial-80.md](2026-05-field-trial-80.md) | empty baseUrl | done | #31 |
| 81  | [2026-05-field-trial-81.md](2026-05-field-trial-81.md) | custom fetch | done | #31 |
| 82  | [2026-05-field-trial-82.md](2026-05-field-trial-82.md) | AbortSignal | done | #31 |
| 83  | [2026-05-field-trial-83.md](2026-05-field-trial-83.md) | port in baseUrl | done | #31 |
| 84  | [2026-05-field-trial-84.md](2026-05-field-trial-84.md) | fetch required | done | #31 |
| 85  | [2026-05-field-trial-85.md](2026-05-field-trial-85.md) | two clients | done | #31 |
| 86  | [2026-05-field-trial-86.md](2026-05-field-trial-86.md) | strip only trailing | done | #31 |
| 87  | [2026-05-field-trial-87.md](2026-05-field-trial-87.md) | 404 not-found | done | #31 |
| 88  | [2026-05-field-trial-88.md](2026-05-field-trial-88.md) | 422 validation | done | #31 |
| 89  | [2026-05-field-trial-89.md](2026-05-field-trial-89.md) | 500 internal | done | #31 |
| 90  | [2026-05-field-trial-90.md](2026-05-field-trial-90.md) | 401 unauthorized | done | #31 |
| 91  | [2026-05-field-trial-91.md](2026-05-field-trial-91.md) | 413 too large | done | #31 |
| 92  | [2026-05-field-trial-92.md](2026-05-field-trial-92.md) | invalid json | done | #31 |
| 93  | [2026-05-field-trial-93.md](2026-05-field-trial-93.md) | html 200 | done | #31 |
| 94  | [2026-05-field-trial-94.md](2026-05-field-trial-94.md) | 204 delete | done | #31 |
| 95  | [2026-05-field-trial-95.md](2026-05-field-trial-95.md) | problem detail text | done | #31 |
| 96  | [2026-05-field-trial-96.md](2026-05-field-trial-96.md) | shape mismatch | done | #31 |
| 97  | [2026-05-field-trial-97.md](2026-05-field-trial-97.md) | isProblemDetails | done | #31 |
| 98  | [2026-05-field-trial-98.md](2026-05-field-trial-98.md) | isValidationPD | done | #31 |
| 99  | [2026-05-field-trial-99.md](2026-05-field-trial-99.md) | parseResponse | done | #31 |
| 100  | [2026-05-field-trial-100.md](2026-05-field-trial-100.md) | validation type URI | done | #31 |
| 101  | [2026-05-field-trial-101.md](2026-05-field-trial-101.md) | extensions | done | #31 |
| 102  | [2026-05-field-trial-102.md](2026-05-field-trial-102.md) | isValidationError | done | #31 |
| 103  | [2026-05-field-trial-103.md](2026-05-field-trial-103.md) | non-problem undefined | done | #31 |
| 104  | [2026-05-field-trial-104.md](2026-05-field-trial-104.md) | fromClientError | done | #31 |
| 105  | [2026-05-field-trial-105.md](2026-05-field-trial-105.md) | byField | done | #31 |
| 106  | [2026-05-field-trial-106.md](2026-05-field-trial-106.md) | non-client undefined | done | #31 |
| 107  | [2026-05-field-trial-107.md](2026-05-field-trial-107.md) | 404 no extract | done | #31 |
| 108  | [2026-05-field-trial-108.md](2026-05-field-trial-108.md) | type URI match | done | #31 |
| 109  | [2026-05-field-trial-109.md](2026-05-field-trial-109.md) | error code field | done | #31 |
| 110  | [2026-05-field-trial-110.md](2026-05-field-trial-110.md) | smoke parallel | done | #31 |
| 111  | [2026-05-field-trial-111.md](2026-05-field-trial-111.md) | parallel lists | done | #31 |
| 112  | [2026-05-field-trial-112.md](2026-05-field-trial-112.md) | seq health | done | #31 |
| 113  | [2026-05-field-trial-113.md](2026-05-field-trial-113.md) | create then get | done | #31 |
| 114  | [2026-05-field-trial-114.md](2026-05-field-trial-114.md) | notes limit | done | #31 |
| 115  | [2026-05-field-trial-115.md](2026-05-field-trial-115.md) | notes offset | done | #31 |
| 116  | [2026-05-field-trial-116.md](2026-05-field-trial-116.md) | notes both | done | #31 |
| 117  | [2026-05-field-trial-117.md](2026-05-field-trial-117.md) | tags limit | done | #31 |
| 118  | [2026-05-field-trial-118.md](2026-05-field-trial-118.md) | tags offset zero | done | #31 |
| 119  | [2026-05-field-trial-119.md](2026-05-field-trial-119.md) | live health | done | #31 |
| 120  | [2026-05-field-trial-120.md](2026-05-field-trial-120.md) | live ping | done | #31 |
| 121  | [2026-05-field-trial-121.md](2026-05-field-trial-121.md) | live smoke | done | #31 |
| 122  | [2026-05-field-trial-122.md](2026-05-field-trial-122.md) | live framework | done | #31 |
| 123  | [2026-05-field-trial-123.md](2026-05-field-trial-123.md) | live machine | done | #31 |
| 124  | [2026-05-field-trial-124.md](2026-05-field-trial-124.md) | live listNotes | done | #31 |
| 125  | [2026-05-field-trial-125.md](2026-05-field-trial-125.md) | live notes CRUD | done | #31 |
| 126  | [2026-05-field-trial-126.md](2026-05-field-trial-126.md) | live tags CRUD | done | #31 |
| 127  | [2026-05-field-trial-127.md](2026-05-field-trial-127.md) | live protected | done | #31 |
| 128  | [2026-05-field-trial-128.md](2026-05-field-trial-128.md) | live 422 | done | #31 |
| 129  | [2026-05-field-trial-129.md](2026-05-field-trial-129.md) | live listTags | done | #31 |
| 130  | [2026-05-field-trial-130.md](2026-05-field-trial-130.md) | [ts_app/nene2_first] ja doc: getting_sta | done | #45 |
| 131  | [2026-05-field-trial-131.md](2026-05-field-trial-131.md) | [ts_app/nene2_first] ja doc: getting_sta | done | #45 |
| 132  | [2026-05-field-trial-132.md](2026-05-field-trial-132.md) | [ts_app/nene2_first] ja doc: getting_sta | done | #45 |
| 133  | [2026-05-field-trial-133.md](2026-05-field-trial-133.md) | [ts_app/nene2_first] ja doc: getting_sta | done | #45 |
| 134  | [2026-05-field-trial-134.md](2026-05-field-trial-134.md) | [ts_app/python_first] ja doc: getting_st | done | #45 |
| 135  | [2026-05-field-trial-135.md](2026-05-field-trial-135.md) | [ts_app/python_first] ja doc: getting_st | done | #45 |
| 136  | [2026-05-field-trial-136.md](2026-05-field-trial-136.md) | [ts_app/python_first] ja doc: getting_st | done | #45 |
| 137  | [2026-05-field-trial-137.md](2026-05-field-trial-137.md) | [ts_app/python_first] ja doc: getting_st | done | #45 |
| 138  | [2026-05-field-trial-138.md](2026-05-field-trial-138.md) | [ts_app/alt_ports] ja doc: getting_start | done | #45 |
| 139  | [2026-05-field-trial-139.md](2026-05-field-trial-139.md) | [ts_app/alt_ports] ja doc: getting_start | done | #45 |
| 140  | [2026-05-field-trial-140.md](2026-05-field-trial-140.md) | [ts_app/alt_ports] ja doc: getting_start | done | #45 |
| 141  | [2026-05-field-trial-141.md](2026-05-field-trial-141.md) | [ts_app/alt_ports] ja doc: getting_start | done | #45 |
| 142  | [2026-05-field-trial-142.md](2026-05-field-trial-142.md) | [ts_app/client_only] ja doc: getting_sta | done | #45 |
| 143  | [2026-05-field-trial-143.md](2026-05-field-trial-143.md) | [ts_app/client_only] ja doc: getting_sta | done | #45 |
| 144  | [2026-05-field-trial-144.md](2026-05-field-trial-144.md) | [ts_app/client_only] ja doc: getting_sta | done | #45 |
| 145  | [2026-05-field-trial-145.md](2026-05-field-trial-145.md) | [ts_app/client_only] ja doc: getting_sta | done | #45 |
| 146  | [2026-05-field-trial-146.md](2026-05-field-trial-146.md) | [py_dev/nene2_first] ja doc: getting_sta | done | #45 |
| 147  | [2026-05-field-trial-147.md](2026-05-field-trial-147.md) | [py_dev/nene2_first] ja doc: getting_sta | done | #45 |
| 148  | [2026-05-field-trial-148.md](2026-05-field-trial-148.md) | [py_dev/nene2_first] ja doc: getting_sta | done | #45 |
| 149  | [2026-05-field-trial-149.md](2026-05-field-trial-149.md) | [py_dev/nene2_first] ja doc: getting_sta | done | #45 |
| 150  | [2026-05-field-trial-150.md](2026-05-field-trial-150.md) | [py_dev/python_first] ja doc: getting_st | done | #45 |
| 151  | [2026-05-field-trial-151.md](2026-05-field-trial-151.md) | [py_dev/python_first] ja doc: getting_st | done | #45 |
| 152  | [2026-05-field-trial-152.md](2026-05-field-trial-152.md) | [py_dev/python_first] ja doc: getting_st | done | #45 |
| 153  | [2026-05-field-trial-153.md](2026-05-field-trial-153.md) | [py_dev/python_first] ja doc: getting_st | done | #45 |
| 154  | [2026-05-field-trial-154.md](2026-05-field-trial-154.md) | [py_dev/alt_ports] ja doc: getting_start | done | #45 |
| 155  | [2026-05-field-trial-155.md](2026-05-field-trial-155.md) | [py_dev/alt_ports] ja doc: getting_start | done | #45 |
| 156  | [2026-05-field-trial-156.md](2026-05-field-trial-156.md) | [py_dev/alt_ports] ja doc: getting_start | done | #45 |
| 157  | [2026-05-field-trial-157.md](2026-05-field-trial-157.md) | [py_dev/alt_ports] ja doc: getting_start | done | #45 |
| 158  | [2026-05-field-trial-158.md](2026-05-field-trial-158.md) | [py_dev/client_only] ja doc: getting_sta | done | #45 |
| 159  | [2026-05-field-trial-159.md](2026-05-field-trial-159.md) | [py_dev/client_only] ja doc: getting_sta | done | #45 |
| 160  | [2026-05-field-trial-160.md](2026-05-field-trial-160.md) | [py_dev/client_only] ja doc: getting_sta | done | #45 |
| 161  | [2026-05-field-trial-161.md](2026-05-field-trial-161.md) | [py_dev/client_only] ja doc: getting_sta | done | #45 |
| 162  | [2026-05-field-trial-162.md](2026-05-field-trial-162.md) | [php_dev/nene2_first] ja doc: getting_st | done | #45 |
| 163  | [2026-05-field-trial-163.md](2026-05-field-trial-163.md) | [php_dev/nene2_first] ja doc: getting_st | done | #45 |
| 164  | [2026-05-field-trial-164.md](2026-05-field-trial-164.md) | [php_dev/nene2_first] ja doc: getting_st | done | #45 |
| 165  | [2026-05-field-trial-165.md](2026-05-field-trial-165.md) | [php_dev/nene2_first] ja doc: getting_st | done | #45 |
| 166  | [2026-05-field-trial-166.md](2026-05-field-trial-166.md) | [php_dev/python_first] ja doc: getting_s | done | #45 |
| 167  | [2026-05-field-trial-167.md](2026-05-field-trial-167.md) | [php_dev/python_first] ja doc: getting_s | done | #45 |
| 168  | [2026-05-field-trial-168.md](2026-05-field-trial-168.md) | [php_dev/python_first] ja doc: getting_s | done | #45 |
| 169  | [2026-05-field-trial-169.md](2026-05-field-trial-169.md) | [php_dev/python_first] ja doc: getting_s | done | #45 |
| 170  | [2026-05-field-trial-170.md](2026-05-field-trial-170.md) | [php_dev/alt_ports] ja doc: getting_star | done | #45 |
| 171  | [2026-05-field-trial-171.md](2026-05-field-trial-171.md) | [php_dev/alt_ports] ja doc: getting_star | done | #45 |
| 172  | [2026-05-field-trial-172.md](2026-05-field-trial-172.md) | [php_dev/alt_ports] ja doc: getting_star | done | #45 |
| 173  | [2026-05-field-trial-173.md](2026-05-field-trial-173.md) | [php_dev/alt_ports] ja doc: getting_star | done | #45 |
| 174  | [2026-05-field-trial-174.md](2026-05-field-trial-174.md) | [php_dev/client_only] ja doc: getting_st | done | #45 |
| 175  | [2026-05-field-trial-175.md](2026-05-field-trial-175.md) | [php_dev/client_only] ja doc: getting_st | done | #45 |
| 176  | [2026-05-field-trial-176.md](2026-05-field-trial-176.md) | [php_dev/client_only] ja doc: getting_st | done | #45 |
| 177  | [2026-05-field-trial-177.md](2026-05-field-trial-177.md) | [php_dev/client_only] ja doc: getting_st | done | #45 |
| 178  | [2026-05-field-trial-178.md](2026-05-field-trial-178.md) | [devops/nene2_first] ja doc: getting_sta | done | #45 |
| 179  | [2026-05-field-trial-179.md](2026-05-field-trial-179.md) | [devops/nene2_first] ja doc: getting_sta | done | #45 |
| 180  | [2026-05-field-trial-180.md](2026-05-field-trial-180.md) | [devops/nene2_first] ja doc: getting_sta | done | #45 |
| 181  | [2026-05-field-trial-181.md](2026-05-field-trial-181.md) | [devops/nene2_first] ja doc: getting_sta | done | #45 |
| 182  | [2026-05-field-trial-182.md](2026-05-field-trial-182.md) | [devops/python_first] ja doc: getting_st | done | #45 |
| 183  | [2026-05-field-trial-183.md](2026-05-field-trial-183.md) | [devops/python_first] ja doc: getting_st | done | #45 |
| 184  | [2026-05-field-trial-184.md](2026-05-field-trial-184.md) | [devops/python_first] ja doc: getting_st | done | #45 |
| 185  | [2026-05-field-trial-185.md](2026-05-field-trial-185.md) | [devops/python_first] ja doc: getting_st | done | #45 |
| 186  | [2026-05-field-trial-186.md](2026-05-field-trial-186.md) | [devops/alt_ports] ja doc: getting_start | done | #45 |
| 187  | [2026-05-field-trial-187.md](2026-05-field-trial-187.md) | [devops/alt_ports] ja doc: getting_start | done | #45 |
| 188  | [2026-05-field-trial-188.md](2026-05-field-trial-188.md) | [devops/alt_ports] ja doc: getting_start | done | #45 |
| 189  | [2026-05-field-trial-189.md](2026-05-field-trial-189.md) | [devops/alt_ports] ja doc: getting_start | done | #45 |
| 190  | [2026-05-field-trial-190.md](2026-05-field-trial-190.md) | [devops/client_only] ja doc: getting_sta | done | #45 |
| 191  | [2026-05-field-trial-191.md](2026-05-field-trial-191.md) | [devops/client_only] ja doc: getting_sta | done | #45 |
| 192  | [2026-05-field-trial-192.md](2026-05-field-trial-192.md) | [devops/client_only] ja doc: getting_sta | done | #45 |
| 193  | [2026-05-field-trial-193.md](2026-05-field-trial-193.md) | [devops/client_only] ja doc: getting_sta | done | #45 |
| 194  | [2026-05-field-trial-194.md](2026-05-field-trial-194.md) | [ai_agent/nene2_first] ja doc: getting_s | done | #45 |
| 195  | [2026-05-field-trial-195.md](2026-05-field-trial-195.md) | [ai_agent/nene2_first] ja doc: getting_s | done | #45 |
| 196  | [2026-05-field-trial-196.md](2026-05-field-trial-196.md) | [ai_agent/nene2_first] ja doc: getting_s | done | #45 |
| 197  | [2026-05-field-trial-197.md](2026-05-field-trial-197.md) | [ai_agent/nene2_first] ja doc: getting_s | done | #45 |
| 198  | [2026-05-field-trial-198.md](2026-05-field-trial-198.md) | [ai_agent/python_first] ja doc: getting_ | done | #45 |
| 199  | [2026-05-field-trial-199.md](2026-05-field-trial-199.md) | [ai_agent/python_first] ja doc: getting_ | done | #45 |
| 200  | [2026-05-field-trial-200.md](2026-05-field-trial-200.md) | [ai_agent/python_first] ja doc: getting_ | done | #45 |
| 201  | [2026-05-field-trial-201.md](2026-05-field-trial-201.md) | [ai_agent/python_first] ja doc: getting_ | done | #45 |
| 202  | [2026-05-field-trial-202.md](2026-05-field-trial-202.md) | [ts_app] client: smoke_fixture | done | #45 |
| 203  | [2026-05-field-trial-203.md](2026-05-field-trial-203.md) | [ts_app] client: health_wrong_service | done | resolved #46 |
| 204  | [2026-05-field-trial-204.md](2026-05-field-trial-204.md) | [ts_app] client: notes_list_fixture | done | #45 |
| 205  | [2026-05-field-trial-205.md](2026-05-field-trial-205.md) | [ts_app] client: protected_401_fixture | done | #45 |
| 206  | [2026-05-field-trial-206.md](2026-05-field-trial-206.md) | [ts_app] client: validation_422_fixture | done | #45 |
| 207  | [2026-05-field-trial-207.md](2026-05-field-trial-207.md) | [ts_app] client: html_wrong_port_hint | done | #45 |
| 208  | [2026-05-field-trial-208.md](2026-05-field-trial-208.md) | [ts_app] client: baseurl_trailing_slash | done | #45 |
| 209  | [2026-05-field-trial-209.md](2026-05-field-trial-209.md) | [ts_app] client: abort_signal | done | #45 |
| 210  | [2026-05-field-trial-210.md](2026-05-field-trial-210.md) | [ts_app] client: machine_health_401 | done | #45 |
| 211  | [2026-05-field-trial-211.md](2026-05-field-trial-211.md) | [ts_app] client: create_note_fixture | done | #45 |
| 212  | [2026-05-field-trial-212.md](2026-05-field-trial-212.md) | [py_dev] client: smoke_fixture | done | #45 |
| 213  | [2026-05-field-trial-213.md](2026-05-field-trial-213.md) | [py_dev] client: health_wrong_service | done | resolved #46 |
| 214  | [2026-05-field-trial-214.md](2026-05-field-trial-214.md) | [py_dev] client: notes_list_fixture | done | #45 |
| 215  | [2026-05-field-trial-215.md](2026-05-field-trial-215.md) | [py_dev] client: protected_401_fixture | done | #45 |
| 216  | [2026-05-field-trial-216.md](2026-05-field-trial-216.md) | [py_dev] client: validation_422_fixture | done | #45 |
| 217  | [2026-05-field-trial-217.md](2026-05-field-trial-217.md) | [py_dev] client: html_wrong_port_hint | done | #45 |
| 218  | [2026-05-field-trial-218.md](2026-05-field-trial-218.md) | [py_dev] client: baseurl_trailing_slash | done | #45 |
| 219  | [2026-05-field-trial-219.md](2026-05-field-trial-219.md) | [py_dev] client: abort_signal | done | #45 |
| 220  | [2026-05-field-trial-220.md](2026-05-field-trial-220.md) | [py_dev] client: machine_health_401 | done | #45 |
| 221  | [2026-05-field-trial-221.md](2026-05-field-trial-221.md) | [py_dev] client: create_note_fixture | done | #45 |
| 222  | [2026-05-field-trial-222.md](2026-05-field-trial-222.md) | [php_dev] client: smoke_fixture | done | #45 |
| 223  | [2026-05-field-trial-223.md](2026-05-field-trial-223.md) | [php_dev] client: health_wrong_service | done | resolved #46 |
| 224  | [2026-05-field-trial-224.md](2026-05-field-trial-224.md) | [php_dev] client: notes_list_fixture | done | #45 |
| 225  | [2026-05-field-trial-225.md](2026-05-field-trial-225.md) | live onboarding 1 | done | #45 |
| 226  | [2026-05-field-trial-226.md](2026-05-field-trial-226.md) | live onboarding 2 | done | #45 |
| 227  | [2026-05-field-trial-227.md](2026-05-field-trial-227.md) | live onboarding 3 | done | #45 |
| 228  | [2026-05-field-trial-228.md](2026-05-field-trial-228.md) | live onboarding 4 | done | #45 |
| 229  | [2026-05-field-trial-229.md](2026-05-field-trial-229.md) | live onboarding 5 | done | #45 |

**`done`** = friction resolution cycle complete. Marathon: FT30–129 [#31](https://github.com/hideyukiMORI/nene2-js/issues/31), FT130–229 [#45](https://github.com/hideyukiMORI/nene2-js/issues/45). Reports follow [field-trial-report.md](../templates/field-trial-report.md) (NENE2 / nene2-python granularity). Run `npm run test:ft-marathon`.
