# Field trials index

Client-library field trials for [nene2-js](https://github.com/hideyukiMORI/nene2-js).  
Methodology: `docs/development/field-trials.md` · Template: `docs/templates/field-trial-report.md` · Friction cycle: [ADR 0004](../adr/0004-field-trial-friction-resolution-cycle.md)

| FT  | Report                                                   | Theme                             | Status | Friction  |
| --- | -------------------------------------------------------- | --------------------------------- | ------ | --------- |
| 1   | [2026-05-field-trial-1.md](2026-05-field-trial-1.md)     | OpenAPI pin + Problem Details     | done   | in report |
| 2   | [2026-05-field-trial-2.md](2026-05-field-trial-2.md)     | `createNene2Client` health / ping | done   | in report |
| 3   | [2026-05-field-trial-3.md](2026-05-field-trial-3.md)     | Example notes + degraded health   | done   | #16 #17   |
| 4   | [2026-05-field-trial-4.md](2026-05-field-trial-4.md)     | `getProtected` + bearer           | done   | #19       |
| 5   | [2026-05-field-trial-5.md](2026-05-field-trial-5.md)     | Note update/delete + evac ports   | done   | #21       |
| 6   | [2026-05-field-trial-6.md](2026-05-field-trial-6.md)     | Example tags CRUD                 | done   | #23       |
| 7   | [2026-05-field-trial-7.md](2026-05-field-trial-7.md)     | Live JWT `getProtected`           | done   | #25       |
| 8   | [2026-05-field-trial-8.md](2026-05-field-trial-8.md)     | Live notes CRUD                   | done   | #26       |
| 9   | [2026-05-field-trial-9.md](2026-05-field-trial-9.md)     | Live tags CRUD                    | done   | #27       |
| 10  | [2026-05-field-trial-10.md](2026-05-field-trial-10.md)   | `frameworkSmoke`                  | done   | #30       |
| 11  | [2026-05-field-trial-11.md](2026-05-field-trial-11.md)   | `machineHealth`                   | done   | #30       |
| 12  | [2026-05-field-trial-12.md](2026-05-field-trial-12.md)   | `smoke()` helper                  | done   | #30       |
| 13  | [2026-05-field-trial-13.md](2026-05-field-trial-13.md)   | `AbortSignal`                     | done   | #30       |
| 14  | [2026-05-field-trial-14.md](2026-05-field-trial-14.md)   | Validation error helpers          | done   | #30       |
| 15  | [2026-05-field-trial-15.md](2026-05-field-trial-15.md)   | HTML JSON hint                    | done   | #30       |
| 16  | [2026-05-field-trial-16.md](2026-05-field-trial-16.md)   | Live frameworkSmoke               | done   | #30       |
| 17  | [2026-05-field-trial-17.md](2026-05-field-trial-17.md)   | Live machineHealth                | done   | #30       |
| 18  | [2026-05-field-trial-18.md](2026-05-field-trial-18.md)   | Live 422 validation               | done   | #30       |
| 19  | [2026-05-field-trial-19.md](2026-05-field-trial-19.md)   | consume-client howto              | done   | #30       |
| 20  | [2026-05-field-trial-20.md](2026-05-field-trial-20.md)   | baseUrl trailing slash            | done   | #30       |
| 21  | [2026-05-field-trial-21.md](2026-05-field-trial-21.md)   | Parallel list endpoints           | done   | #30       |
| 22  | [2026-05-field-trial-22.md](2026-05-field-trial-22.md)   | Export surface                    | done   | #30       |
| 23  | [2026-05-field-trial-23.md](2026-05-field-trial-23.md)   | Evac machine API key              | done   | #30       |
| 24  | [2026-05-field-trial-24.md](2026-05-field-trial-24.md)   | README `smoke()`                  | done   | #30       |
| 25  | [2026-05-field-trial-25.md](2026-05-field-trial-25.md)   | Evac live script                  | done   | #30       |
| 26  | [2026-05-field-trial-26.md](2026-05-field-trial-26.md)   | Tags delete 404                   | done   | #30       |
| 27  | [2026-05-field-trial-27.md](2026-05-field-trial-27.md)   | Protected 401                     | done   | #30       |
| 28  | [2026-05-field-trial-28.md](2026-05-field-trial-28.md)   | contracts:check in loop           | done   | #30       |
| 29  | [2026-05-field-trial-29.md](2026-05-field-trial-29.md)   | Marathon INDEX                    | done   | #30       |
| 30  | [2026-05-field-trial-30.md](2026-05-field-trial-30.md)   | health 200 ok                     | done   | #42       |
| 31  | [2026-05-field-trial-31.md](2026-05-field-trial-31.md)   | health 503 throw default          | done   | #42       |
| 32  | [2026-05-field-trial-32.md](2026-05-field-trial-32.md)   | health 503 allowDegraded          | done   | #42       |
| 33  | [2026-05-field-trial-33.md](2026-05-field-trial-33.md)   | health checks map ok              | done   | #42       |
| 34  | [2026-05-field-trial-34.md](2026-05-field-trial-34.md)   | health service must be NENE2      | done   | #42       |
| 35  | [2026-05-field-trial-35.md](2026-05-field-trial-35.md)   | health invalid shape              | done   | #42       |
| 36  | [2026-05-field-trial-36.md](2026-05-field-trial-36.md)   | health html wrong port            | done   | #42       |
| 37  | [2026-05-field-trial-37.md](2026-05-field-trial-37.md)   | health 500 problem                | done   | #42       |
| 38  | [2026-05-field-trial-38.md](2026-05-field-trial-38.md)   | frameworkSmoke GET /              | done   | #42       |
| 39  | [2026-05-field-trial-39.md](2026-05-field-trial-39.md)   | ping pong                         | done   | #42       |
| 40  | [2026-05-field-trial-40.md](2026-05-field-trial-40.md)   | smoke parallel                    | done   | #42       |
| 41  | [2026-05-field-trial-41.md](2026-05-field-trial-41.md)   | machineHealth 200                 | done   | #42       |
| 42  | [2026-05-field-trial-42.md](2026-05-field-trial-42.md)   | machineHealth 401                 | done   | #42       |
| 43  | [2026-05-field-trial-43.md](2026-05-field-trial-43.md)   | framework bad status              | done   | #42       |
| 44  | [2026-05-field-trial-44.md](2026-05-field-trial-44.md)   | ping bad message                  | done   | #42       |
| 45  | [2026-05-field-trial-45.md](2026-05-field-trial-45.md)   | listNotes                         | done   | #42       |
| 46  | [2026-05-field-trial-46.md](2026-05-field-trial-46.md)   | listNotes query                   | done   | #42       |
| 47  | [2026-05-field-trial-47.md](2026-05-field-trial-47.md)   | getNote                           | done   | #42       |
| 48  | [2026-05-field-trial-48.md](2026-05-field-trial-48.md)   | createNote                        | done   | #42       |
| 49  | [2026-05-field-trial-49.md](2026-05-field-trial-49.md)   | updateNote                        | done   | #42       |
| 50  | [2026-05-field-trial-50.md](2026-05-field-trial-50.md)   | deleteNote                        | done   | #42       |
| 51  | [2026-05-field-trial-51.md](2026-05-field-trial-51.md)   | getNote 404                       | done   | #42       |
| 52  | [2026-05-field-trial-52.md](2026-05-field-trial-52.md)   | createNote 422                    | done   | #42       |
| 53  | [2026-05-field-trial-53.md](2026-05-field-trial-53.md)   | createNote POST body              | done   | #42       |
| 54  | [2026-05-field-trial-54.md](2026-05-field-trial-54.md)   | update path                       | done   | #42       |
| 55  | [2026-05-field-trial-55.md](2026-05-field-trial-55.md)   | delete path                       | done   | #42       |
| 56  | [2026-05-field-trial-56.md](2026-05-field-trial-56.md)   | listTags                          | done   | #42       |
| 57  | [2026-05-field-trial-57.md](2026-05-field-trial-57.md)   | listTags query                    | done   | #42       |
| 58  | [2026-05-field-trial-58.md](2026-05-field-trial-58.md)   | getTag                            | done   | #42       |
| 59  | [2026-05-field-trial-59.md](2026-05-field-trial-59.md)   | createTag                         | done   | #42       |
| 60  | [2026-05-field-trial-60.md](2026-05-field-trial-60.md)   | updateTag                         | done   | #42       |
| 61  | [2026-05-field-trial-61.md](2026-05-field-trial-61.md)   | deleteTag                         | done   | #42       |
| 62  | [2026-05-field-trial-62.md](2026-05-field-trial-62.md)   | getTag 404                        | done   | #42       |
| 63  | [2026-05-field-trial-63.md](2026-05-field-trial-63.md)   | createTag body                    | done   | #42       |
| 64  | [2026-05-field-trial-64.md](2026-05-field-trial-64.md)   | update path                       | done   | #42       |
| 65  | [2026-05-field-trial-65.md](2026-05-field-trial-65.md)   | delete path                       | done   | #42       |
| 66  | [2026-05-field-trial-66.md](2026-05-field-trial-66.md)   | getProtected ok                   | done   | #42       |
| 67  | [2026-05-field-trial-67.md](2026-05-field-trial-67.md)   | getProtected 401                  | done   | #42       |
| 68  | [2026-05-field-trial-68.md](2026-05-field-trial-68.md)   | bearer header                     | done   | #42       |
| 69  | [2026-05-field-trial-69.md](2026-05-field-trial-69.md)   | invalid jwt                       | done   | #42       |
| 70  | [2026-05-field-trial-70.md](2026-05-field-trial-70.md)   | claims sub                        | done   | #42       |
| 71  | [2026-05-field-trial-71.md](2026-05-field-trial-71.md)   | welcome message                   | done   | #42       |
| 72  | [2026-05-field-trial-72.md](2026-05-field-trial-72.md)   | apiKey machine                    | done   | #42       |
| 73  | [2026-05-field-trial-73.md](2026-05-field-trial-73.md)   | bearer protected                  | done   | #42       |
| 74  | [2026-05-field-trial-74.md](2026-05-field-trial-74.md)   | both headers                      | done   | #42       |
| 75  | [2026-05-field-trial-75.md](2026-05-field-trial-75.md)   | X-NENE2-API-Key name              | done   | #42       |
| 76  | [2026-05-field-trial-76.md](2026-05-field-trial-76.md)   | Authorization Bearer              | done   | #42       |
| 77  | [2026-05-field-trial-77.md](2026-05-field-trial-77.md)   | public no auth                    | done   | #42       |
| 78  | [2026-05-field-trial-78.md](2026-05-field-trial-78.md)   | no apiKey on health               | done   | #42       |
| 79  | [2026-05-field-trial-79.md](2026-05-field-trial-79.md)   | trailing slash                    | done   | #42       |
| 80  | [2026-05-field-trial-80.md](2026-05-field-trial-80.md)   | empty baseUrl                     | done   | #42       |
| 81  | [2026-05-field-trial-81.md](2026-05-field-trial-81.md)   | custom fetch                      | done   | #42       |
| 82  | [2026-05-field-trial-82.md](2026-05-field-trial-82.md)   | AbortSignal                       | done   | #42       |
| 83  | [2026-05-field-trial-83.md](2026-05-field-trial-83.md)   | port in baseUrl                   | done   | #42       |
| 84  | [2026-05-field-trial-84.md](2026-05-field-trial-84.md)   | fetch required                    | done   | #42       |
| 85  | [2026-05-field-trial-85.md](2026-05-field-trial-85.md)   | two clients                       | done   | #42       |
| 86  | [2026-05-field-trial-86.md](2026-05-field-trial-86.md)   | strip only trailing               | done   | #42       |
| 87  | [2026-05-field-trial-87.md](2026-05-field-trial-87.md)   | 404 not-found                     | done   | #42       |
| 88  | [2026-05-field-trial-88.md](2026-05-field-trial-88.md)   | 422 validation                    | done   | #42       |
| 89  | [2026-05-field-trial-89.md](2026-05-field-trial-89.md)   | 500 internal                      | done   | #42       |
| 90  | [2026-05-field-trial-90.md](2026-05-field-trial-90.md)   | 401 unauthorized                  | done   | #42       |
| 91  | [2026-05-field-trial-91.md](2026-05-field-trial-91.md)   | 413 too large                     | done   | #42       |
| 92  | [2026-05-field-trial-92.md](2026-05-field-trial-92.md)   | invalid json                      | done   | #42       |
| 93  | [2026-05-field-trial-93.md](2026-05-field-trial-93.md)   | html 200                          | done   | #42       |
| 94  | [2026-05-field-trial-94.md](2026-05-field-trial-94.md)   | 204 delete                        | done   | #42       |
| 95  | [2026-05-field-trial-95.md](2026-05-field-trial-95.md)   | problem detail text               | done   | #42       |
| 96  | [2026-05-field-trial-96.md](2026-05-field-trial-96.md)   | shape mismatch                    | done   | #42       |
| 97  | [2026-05-field-trial-97.md](2026-05-field-trial-97.md)   | isProblemDetails                  | done   | #42       |
| 98  | [2026-05-field-trial-98.md](2026-05-field-trial-98.md)   | isValidationPD                    | done   | #42       |
| 99  | [2026-05-field-trial-99.md](2026-05-field-trial-99.md)   | parseResponse                     | done   | #42       |
| 100 | [2026-05-field-trial-100.md](2026-05-field-trial-100.md) | validation type URI               | done   | #42       |
| 101 | [2026-05-field-trial-101.md](2026-05-field-trial-101.md) | extensions                        | done   | #42       |
| 102 | [2026-05-field-trial-102.md](2026-05-field-trial-102.md) | isValidationError                 | done   | #42       |
| 103 | [2026-05-field-trial-103.md](2026-05-field-trial-103.md) | non-problem undefined             | done   | #42       |
| 104 | [2026-05-field-trial-104.md](2026-05-field-trial-104.md) | fromClientError                   | done   | #42       |
| 105 | [2026-05-field-trial-105.md](2026-05-field-trial-105.md) | byField                           | done   | #42       |
| 106 | [2026-05-field-trial-106.md](2026-05-field-trial-106.md) | non-client undefined              | done   | #42       |
| 107 | [2026-05-field-trial-107.md](2026-05-field-trial-107.md) | 404 no extract                    | done   | #42       |
| 108 | [2026-05-field-trial-108.md](2026-05-field-trial-108.md) | type URI match                    | done   | #42       |
| 109 | [2026-05-field-trial-109.md](2026-05-field-trial-109.md) | error code field                  | done   | #42       |
| 110 | [2026-05-field-trial-110.md](2026-05-field-trial-110.md) | smoke parallel                    | done   | #42       |
| 111 | [2026-05-field-trial-111.md](2026-05-field-trial-111.md) | parallel lists                    | done   | #42       |
| 112 | [2026-05-field-trial-112.md](2026-05-field-trial-112.md) | seq health                        | done   | #42       |
| 113 | [2026-05-field-trial-113.md](2026-05-field-trial-113.md) | create then get                   | done   | #42       |
| 114 | [2026-05-field-trial-114.md](2026-05-field-trial-114.md) | notes limit                       | done   | #42       |
| 115 | [2026-05-field-trial-115.md](2026-05-field-trial-115.md) | notes offset                      | done   | #42       |
| 116 | [2026-05-field-trial-116.md](2026-05-field-trial-116.md) | notes both                        | done   | #42       |
| 117 | [2026-05-field-trial-117.md](2026-05-field-trial-117.md) | tags limit                        | done   | #42       |
| 118 | [2026-05-field-trial-118.md](2026-05-field-trial-118.md) | tags offset zero                  | done   | #42       |
| 119 | [2026-05-field-trial-119.md](2026-05-field-trial-119.md) | live health                       | done   | #42       |
| 120 | [2026-05-field-trial-120.md](2026-05-field-trial-120.md) | live ping                         | done   | #42       |
| 121 | [2026-05-field-trial-121.md](2026-05-field-trial-121.md) | live smoke                        | done   | #42       |
| 122 | [2026-05-field-trial-122.md](2026-05-field-trial-122.md) | live framework                    | done   | #42       |
| 123 | [2026-05-field-trial-123.md](2026-05-field-trial-123.md) | live machine                      | done   | #42       |
| 124 | [2026-05-field-trial-124.md](2026-05-field-trial-124.md) | live listNotes                    | done   | #42       |
| 125 | [2026-05-field-trial-125.md](2026-05-field-trial-125.md) | live notes CRUD                   | done   | #42       |
| 126 | [2026-05-field-trial-126.md](2026-05-field-trial-126.md) | live tags CRUD                    | done   | #42       |
| 127 | [2026-05-field-trial-127.md](2026-05-field-trial-127.md) | live protected                    | done   | #42       |
| 128 | [2026-05-field-trial-128.md](2026-05-field-trial-128.md) | live 422                          | done   | #42       |
| 129 | [2026-05-field-trial-129.md](2026-05-field-trial-129.md) | live listTags                     | done   | #42       |
| 130 | [2026-05-field-trial-130.md](2026-05-field-trial-130.md) | problem HTTP 400 on getNote       | done   | #42       |
| 131 | [2026-05-field-trial-131.md](2026-05-field-trial-131.md) | problem HTTP 400 on createNote    | done   | #42       |
| 132 | [2026-05-field-trial-132.md](2026-05-field-trial-132.md) | problem HTTP 401 on getNote       | done   | #42       |
| 133 | [2026-05-field-trial-133.md](2026-05-field-trial-133.md) | problem HTTP 401 on createNote    | done   | #42       |
| 134 | [2026-05-field-trial-134.md](2026-05-field-trial-134.md) | problem HTTP 403 on getNote       | done   | #42       |
| 135 | [2026-05-field-trial-135.md](2026-05-field-trial-135.md) | problem HTTP 403 on createNote    | done   | #42       |
| 136 | [2026-05-field-trial-136.md](2026-05-field-trial-136.md) | problem HTTP 404 on getNote       | done   | #42       |
| 137 | [2026-05-field-trial-137.md](2026-05-field-trial-137.md) | problem HTTP 404 on createNote    | done   | #42       |
| 138 | [2026-05-field-trial-138.md](2026-05-field-trial-138.md) | problem HTTP 405 on getNote       | done   | #42       |
| 139 | [2026-05-field-trial-139.md](2026-05-field-trial-139.md) | problem HTTP 405 on createNote    | done   | #42       |
| 140 | [2026-05-field-trial-140.md](2026-05-field-trial-140.md) | problem HTTP 409 on getNote       | done   | #42       |
| 141 | [2026-05-field-trial-141.md](2026-05-field-trial-141.md) | problem HTTP 409 on createNote    | done   | #42       |
| 142 | [2026-05-field-trial-142.md](2026-05-field-trial-142.md) | problem HTTP 413 on getNote       | done   | #42       |
| 143 | [2026-05-field-trial-143.md](2026-05-field-trial-143.md) | problem HTTP 413 on createNote    | done   | #42       |
| 144 | [2026-05-field-trial-144.md](2026-05-field-trial-144.md) | problem HTTP 422 on getNote       | done   | #42       |
| 145 | [2026-05-field-trial-145.md](2026-05-field-trial-145.md) | problem HTTP 422 on createNote    | done   | #42       |
| 146 | [2026-05-field-trial-146.md](2026-05-field-trial-146.md) | problem HTTP 429 on getNote       | done   | #42       |
| 147 | [2026-05-field-trial-147.md](2026-05-field-trial-147.md) | problem HTTP 429 on createNote    | done   | #42       |
| 148 | [2026-05-field-trial-148.md](2026-05-field-trial-148.md) | problem HTTP 500 on getNote       | done   | #42       |
| 149 | [2026-05-field-trial-149.md](2026-05-field-trial-149.md) | problem HTTP 500 on createNote    | done   | #42       |
| 150 | [2026-05-field-trial-150.md](2026-05-field-trial-150.md) | problem HTTP 502 on getNote       | done   | #42       |
| 151 | [2026-05-field-trial-151.md](2026-05-field-trial-151.md) | problem HTTP 502 on createNote    | done   | #42       |
| 152 | [2026-05-field-trial-152.md](2026-05-field-trial-152.md) | problem HTTP 503 on getNote       | done   | #42       |
| 153 | [2026-05-field-trial-153.md](2026-05-field-trial-153.md) | problem HTTP 503 on createNote    | done   | #42       |
| 154 | [2026-05-field-trial-154.md](2026-05-field-trial-154.md) | notes list limit=0                | done   | #42       |
| 155 | [2026-05-field-trial-155.md](2026-05-field-trial-155.md) | tags list limit=0                 | done   | #42       |
| 156 | [2026-05-field-trial-156.md](2026-05-field-trial-156.md) | notes list limit=1                | done   | #42       |
| 157 | [2026-05-field-trial-157.md](2026-05-field-trial-157.md) | tags list limit=1                 | done   | #42       |
| 158 | [2026-05-field-trial-158.md](2026-05-field-trial-158.md) | notes list limit=2                | done   | #42       |
| 159 | [2026-05-field-trial-159.md](2026-05-field-trial-159.md) | tags list limit=2                 | done   | #42       |
| 160 | [2026-05-field-trial-160.md](2026-05-field-trial-160.md) | notes list limit=3                | done   | #42       |
| 161 | [2026-05-field-trial-161.md](2026-05-field-trial-161.md) | tags list limit=3                 | done   | #42       |
| 162 | [2026-05-field-trial-162.md](2026-05-field-trial-162.md) | notes list limit=5                | done   | #42       |
| 163 | [2026-05-field-trial-163.md](2026-05-field-trial-163.md) | tags list limit=5                 | done   | #42       |
| 164 | [2026-05-field-trial-164.md](2026-05-field-trial-164.md) | notes list limit=7                | done   | #42       |
| 165 | [2026-05-field-trial-165.md](2026-05-field-trial-165.md) | tags list limit=7                 | done   | #42       |
| 166 | [2026-05-field-trial-166.md](2026-05-field-trial-166.md) | notes list limit=10               | done   | #42       |
| 167 | [2026-05-field-trial-167.md](2026-05-field-trial-167.md) | tags list limit=10                | done   | #42       |
| 168 | [2026-05-field-trial-168.md](2026-05-field-trial-168.md) | notes list limit=15               | done   | #42       |
| 169 | [2026-05-field-trial-169.md](2026-05-field-trial-169.md) | tags list limit=15                | done   | #42       |
| 170 | [2026-05-field-trial-170.md](2026-05-field-trial-170.md) | notes list limit=20               | done   | #42       |
| 171 | [2026-05-field-trial-171.md](2026-05-field-trial-171.md) | tags list limit=20                | done   | #42       |
| 172 | [2026-05-field-trial-172.md](2026-05-field-trial-172.md) | notes list limit=25               | done   | #42       |
| 173 | [2026-05-field-trial-173.md](2026-05-field-trial-173.md) | tags list limit=25                | done   | #42       |
| 174 | [2026-05-field-trial-174.md](2026-05-field-trial-174.md) | notes list limit=50               | done   | #42       |
| 175 | [2026-05-field-trial-175.md](2026-05-field-trial-175.md) | tags list limit=50                | done   | #42       |
| 176 | [2026-05-field-trial-176.md](2026-05-field-trial-176.md) | notes list limit=75               | done   | #42       |
| 177 | [2026-05-field-trial-177.md](2026-05-field-trial-177.md) | tags list limit=75                | done   | #42       |
| 178 | [2026-05-field-trial-178.md](2026-05-field-trial-178.md) | notes list limit=99               | done   | #42       |
| 179 | [2026-05-field-trial-179.md](2026-05-field-trial-179.md) | tags list limit=99                | done   | #42       |
| 180 | [2026-05-field-trial-180.md](2026-05-field-trial-180.md) | notes list limit=100              | done   | #42       |
| 181 | [2026-05-field-trial-181.md](2026-05-field-trial-181.md) | tags list limit=100               | done   | #42       |
| 182 | [2026-05-field-trial-182.md](2026-05-field-trial-182.md) | notes list limit=150              | done   | #42       |
| 183 | [2026-05-field-trial-183.md](2026-05-field-trial-183.md) | tags list limit=150               | done   | #42       |
| 184 | [2026-05-field-trial-184.md](2026-05-field-trial-184.md) | notes list limit=200              | done   | #42       |
| 185 | [2026-05-field-trial-185.md](2026-05-field-trial-185.md) | tags list limit=200               | done   | #42       |
| 186 | [2026-05-field-trial-186.md](2026-05-field-trial-186.md) | notes list limit=500              | done   | #42       |
| 187 | [2026-05-field-trial-187.md](2026-05-field-trial-187.md) | tags list limit=500               | done   | #42       |
| 188 | [2026-05-field-trial-188.md](2026-05-field-trial-188.md) | notes list limit=999              | done   | #42       |
| 189 | [2026-05-field-trial-189.md](2026-05-field-trial-189.md) | tags list limit=999               | done   | #42       |
| 190 | [2026-05-field-trial-190.md](2026-05-field-trial-190.md) | notes offset=0                    | done   | #42       |
| 191 | [2026-05-field-trial-191.md](2026-05-field-trial-191.md) | tags offset=0                     | done   | #42       |
| 192 | [2026-05-field-trial-192.md](2026-05-field-trial-192.md) | notes offset=1                    | done   | #42       |
| 193 | [2026-05-field-trial-193.md](2026-05-field-trial-193.md) | tags offset=1                     | done   | #42       |
| 194 | [2026-05-field-trial-194.md](2026-05-field-trial-194.md) | notes offset=2                    | done   | #42       |
| 195 | [2026-05-field-trial-195.md](2026-05-field-trial-195.md) | tags offset=2                     | done   | #42       |
| 196 | [2026-05-field-trial-196.md](2026-05-field-trial-196.md) | notes offset=5                    | done   | #42       |
| 197 | [2026-05-field-trial-197.md](2026-05-field-trial-197.md) | tags offset=5                     | done   | #42       |
| 198 | [2026-05-field-trial-198.md](2026-05-field-trial-198.md) | notes offset=10                   | done   | #42       |
| 199 | [2026-05-field-trial-199.md](2026-05-field-trial-199.md) | tags offset=10                    | done   | #42       |
| 200 | [2026-05-field-trial-200.md](2026-05-field-trial-200.md) | notes offset=20                   | done   | #42       |
| 201 | [2026-05-field-trial-201.md](2026-05-field-trial-201.md) | tags offset=20                    | done   | #42       |
| 202 | [2026-05-field-trial-202.md](2026-05-field-trial-202.md) | notes offset=50                   | done   | #42       |
| 203 | [2026-05-field-trial-203.md](2026-05-field-trial-203.md) | tags offset=50                    | done   | #42       |
| 204 | [2026-05-field-trial-204.md](2026-05-field-trial-204.md) | notes offset=100                  | done   | #42       |
| 205 | [2026-05-field-trial-205.md](2026-05-field-trial-205.md) | tags offset=100                   | done   | #42       |
| 206 | [2026-05-field-trial-206.md](2026-05-field-trial-206.md) | notes offset=500                  | done   | #42       |
| 207 | [2026-05-field-trial-207.md](2026-05-field-trial-207.md) | tags offset=500                   | done   | #42       |
| 208 | [2026-05-field-trial-208.md](2026-05-field-trial-208.md) | notes offset=1000                 | done   | #42       |
| 209 | [2026-05-field-trial-209.md](2026-05-field-trial-209.md) | tags offset=1000                  | done   | #42       |
| 210 | [2026-05-field-trial-210.md](2026-05-field-trial-210.md) | notes offset=9999                 | done   | #42       |
| 211 | [2026-05-field-trial-211.md](2026-05-field-trial-211.md) | tags offset=9999                  | done   | #42       |
| 212 | [2026-05-field-trial-212.md](2026-05-field-trial-212.md) | notes limit+offset combo 0        | done   | #42       |
| 213 | [2026-05-field-trial-213.md](2026-05-field-trial-213.md) | tags limit+offset combo 0         | done   | #42       |
| 214 | [2026-05-field-trial-214.md](2026-05-field-trial-214.md) | notes limit+offset combo 1        | done   | #42       |
| 215 | [2026-05-field-trial-215.md](2026-05-field-trial-215.md) | tags limit+offset combo 1         | done   | #42       |
| 216 | [2026-05-field-trial-216.md](2026-05-field-trial-216.md) | notes limit+offset combo 2        | done   | #42       |
| 217 | [2026-05-field-trial-217.md](2026-05-field-trial-217.md) | tags limit+offset combo 2         | done   | #42       |
| 218 | [2026-05-field-trial-218.md](2026-05-field-trial-218.md) | notes limit+offset combo 3        | done   | #42       |
| 219 | [2026-05-field-trial-219.md](2026-05-field-trial-219.md) | tags limit+offset combo 3         | done   | #42       |
| 220 | [2026-05-field-trial-220.md](2026-05-field-trial-220.md) | notes limit+offset combo 4        | done   | #42       |
| 221 | [2026-05-field-trial-221.md](2026-05-field-trial-221.md) | tags limit+offset combo 4         | done   | #42       |
| 222 | [2026-05-field-trial-222.md](2026-05-field-trial-222.md) | notes limit+offset combo 5        | done   | #42       |
| 223 | [2026-05-field-trial-223.md](2026-05-field-trial-223.md) | tags limit+offset combo 5         | done   | #42       |
| 224 | [2026-05-field-trial-224.md](2026-05-field-trial-224.md) | notes limit+offset combo 6        | done   | #42       |
| 225 | [2026-05-field-trial-225.md](2026-05-field-trial-225.md) | tags limit+offset combo 6         | done   | #42       |
| 226 | [2026-05-field-trial-226.md](2026-05-field-trial-226.md) | notes limit+offset combo 7        | done   | #42       |
| 227 | [2026-05-field-trial-227.md](2026-05-field-trial-227.md) | tags limit+offset combo 7         | done   | #42       |
| 228 | [2026-05-field-trial-228.md](2026-05-field-trial-228.md) | notes limit+offset combo 8        | done   | #42       |
| 229 | [2026-05-field-trial-229.md](2026-05-field-trial-229.md) | tags limit+offset combo 8         | done   | #42       |
| 230 | [2026-05-field-trial-230.md](2026-05-field-trial-230.md) | notes limit+offset combo 9        | done   | #42       |
| 231 | [2026-05-field-trial-231.md](2026-05-field-trial-231.md) | tags limit+offset combo 9         | done   | #42       |
| 232 | [2026-05-field-trial-232.md](2026-05-field-trial-232.md) | notes limit+offset combo 10       | done   | #42       |
| 233 | [2026-05-field-trial-233.md](2026-05-field-trial-233.md) | tags limit+offset combo 10        | done   | #42       |
| 234 | [2026-05-field-trial-234.md](2026-05-field-trial-234.md) | notes limit+offset combo 11       | done   | #42       |
| 235 | [2026-05-field-trial-235.md](2026-05-field-trial-235.md) | tags limit+offset combo 11        | done   | #42       |
| 236 | [2026-05-field-trial-236.md](2026-05-field-trial-236.md) | notes limit+offset combo 12       | done   | #42       |
| 237 | [2026-05-field-trial-237.md](2026-05-field-trial-237.md) | tags limit+offset combo 12        | done   | #42       |
| 238 | [2026-05-field-trial-238.md](2026-05-field-trial-238.md) | notes limit+offset combo 13       | done   | #42       |
| 239 | [2026-05-field-trial-239.md](2026-05-field-trial-239.md) | tags limit+offset combo 13        | done   | #42       |
| 240 | [2026-05-field-trial-240.md](2026-05-field-trial-240.md) | notes limit+offset combo 14       | done   | #42       |
| 241 | [2026-05-field-trial-241.md](2026-05-field-trial-241.md) | tags limit+offset combo 14        | done   | #42       |
| 242 | [2026-05-field-trial-242.md](2026-05-field-trial-242.md) | notes limit+offset combo 15       | done   | #42       |
| 243 | [2026-05-field-trial-243.md](2026-05-field-trial-243.md) | tags limit+offset combo 15        | done   | #42       |
| 244 | [2026-05-field-trial-244.md](2026-05-field-trial-244.md) | notes limit+offset combo 16       | done   | #42       |
| 245 | [2026-05-field-trial-245.md](2026-05-field-trial-245.md) | tags limit+offset combo 16        | done   | #42       |
| 246 | [2026-05-field-trial-246.md](2026-05-field-trial-246.md) | notes limit+offset combo 17       | done   | #42       |
| 247 | [2026-05-field-trial-247.md](2026-05-field-trial-247.md) | tags limit+offset combo 17        | done   | #42       |
| 248 | [2026-05-field-trial-248.md](2026-05-field-trial-248.md) | notes limit+offset combo 18       | done   | #42       |
| 249 | [2026-05-field-trial-249.md](2026-05-field-trial-249.md) | tags limit+offset combo 18        | done   | #42       |
| 250 | [2026-05-field-trial-250.md](2026-05-field-trial-250.md) | notes limit+offset combo 19       | done   | #42       |
| 251 | [2026-05-field-trial-251.md](2026-05-field-trial-251.md) | tags limit+offset combo 19        | done   | #42       |
| 252 | [2026-05-field-trial-252.md](2026-05-field-trial-252.md) | getNote path id=1                 | done   | #42       |
| 253 | [2026-05-field-trial-253.md](2026-05-field-trial-253.md) | updateNote id=1                   | done   | #42       |
| 254 | [2026-05-field-trial-254.md](2026-05-field-trial-254.md) | deleteNote id=1                   | done   | #42       |
| 255 | [2026-05-field-trial-255.md](2026-05-field-trial-255.md) | getNote path id=2                 | done   | #42       |
| 256 | [2026-05-field-trial-256.md](2026-05-field-trial-256.md) | updateNote id=2                   | done   | #42       |
| 257 | [2026-05-field-trial-257.md](2026-05-field-trial-257.md) | deleteNote id=2                   | done   | #42       |
| 258 | [2026-05-field-trial-258.md](2026-05-field-trial-258.md) | getNote path id=7                 | done   | #42       |
| 259 | [2026-05-field-trial-259.md](2026-05-field-trial-259.md) | updateNote id=7                   | done   | #42       |
| 260 | [2026-05-field-trial-260.md](2026-05-field-trial-260.md) | deleteNote id=7                   | done   | #42       |
| 261 | [2026-05-field-trial-261.md](2026-05-field-trial-261.md) | getNote path id=42                | done   | #42       |
| 262 | [2026-05-field-trial-262.md](2026-05-field-trial-262.md) | updateNote id=42                  | done   | #42       |
| 263 | [2026-05-field-trial-263.md](2026-05-field-trial-263.md) | deleteNote id=42                  | done   | #42       |
| 264 | [2026-05-field-trial-264.md](2026-05-field-trial-264.md) | getNote path id=99                | done   | #42       |
| 265 | [2026-05-field-trial-265.md](2026-05-field-trial-265.md) | updateNote id=99                  | done   | #42       |
| 266 | [2026-05-field-trial-266.md](2026-05-field-trial-266.md) | deleteNote id=99                  | done   | #42       |
| 267 | [2026-05-field-trial-267.md](2026-05-field-trial-267.md) | getNote path id=100               | done   | #42       |
| 268 | [2026-05-field-trial-268.md](2026-05-field-trial-268.md) | updateNote id=100                 | done   | #42       |
| 269 | [2026-05-field-trial-269.md](2026-05-field-trial-269.md) | deleteNote id=100                 | done   | #42       |
| 270 | [2026-05-field-trial-270.md](2026-05-field-trial-270.md) | getNote path id=999               | done   | #42       |
| 271 | [2026-05-field-trial-271.md](2026-05-field-trial-271.md) | updateNote id=999                 | done   | #42       |
| 272 | [2026-05-field-trial-272.md](2026-05-field-trial-272.md) | deleteNote id=999                 | done   | #42       |
| 273 | [2026-05-field-trial-273.md](2026-05-field-trial-273.md) | getNote path id=10000             | done   | #42       |
| 274 | [2026-05-field-trial-274.md](2026-05-field-trial-274.md) | updateNote id=10000               | done   | #42       |
| 275 | [2026-05-field-trial-275.md](2026-05-field-trial-275.md) | deleteNote id=10000               | done   | #42       |
| 276 | [2026-05-field-trial-276.md](2026-05-field-trial-276.md) | getNote path id=2147483646        | done   | #42       |
| 277 | [2026-05-field-trial-277.md](2026-05-field-trial-277.md) | updateNote id=2147483646          | done   | #42       |
| 278 | [2026-05-field-trial-278.md](2026-05-field-trial-278.md) | deleteNote id=2147483646          | done   | #42       |
| 279 | [2026-05-field-trial-279.md](2026-05-field-trial-279.md) | getTag id=1                       | done   | #42       |
| 280 | [2026-05-field-trial-280.md](2026-05-field-trial-280.md) | getTag id=3                       | done   | #42       |
| 281 | [2026-05-field-trial-281.md](2026-05-field-trial-281.md) | getTag id=8                       | done   | #42       |
| 282 | [2026-05-field-trial-282.md](2026-05-field-trial-282.md) | getTag id=55                      | done   | #42       |
| 283 | [2026-05-field-trial-283.md](2026-05-field-trial-283.md) | getTag id=200                     | done   | #42       |
| 284 | [2026-05-field-trial-284.md](2026-05-field-trial-284.md) | getTag id=9999                    | done   | #42       |
| 285 | [2026-05-field-trial-285.md](2026-05-field-trial-285.md) | validation field index 0          | done   | #42       |
| 286 | [2026-05-field-trial-286.md](2026-05-field-trial-286.md) | validation field index 1          | done   | #42       |
| 287 | [2026-05-field-trial-287.md](2026-05-field-trial-287.md) | validation field index 2          | done   | #42       |
| 288 | [2026-05-field-trial-288.md](2026-05-field-trial-288.md) | validation field index 3          | done   | #42       |
| 289 | [2026-05-field-trial-289.md](2026-05-field-trial-289.md) | validation field index 4          | done   | #42       |
| 290 | [2026-05-field-trial-290.md](2026-05-field-trial-290.md) | validation field index 5          | done   | #42       |
| 291 | [2026-05-field-trial-291.md](2026-05-field-trial-291.md) | validation field index 6          | done   | #42       |
| 292 | [2026-05-field-trial-292.md](2026-05-field-trial-292.md) | validation field index 7          | done   | #42       |
| 293 | [2026-05-field-trial-293.md](2026-05-field-trial-293.md) | validation field index 8          | done   | #42       |
| 294 | [2026-05-field-trial-294.md](2026-05-field-trial-294.md) | validation field index 9          | done   | #42       |
| 295 | [2026-05-field-trial-295.md](2026-05-field-trial-295.md) | validation field index 10         | done   | #42       |
| 296 | [2026-05-field-trial-296.md](2026-05-field-trial-296.md) | validation field index 11         | done   | #42       |
| 297 | [2026-05-field-trial-297.md](2026-05-field-trial-297.md) | validation field index 12         | done   | #42       |
| 298 | [2026-05-field-trial-298.md](2026-05-field-trial-298.md) | validation field index 13         | done   | #42       |
| 299 | [2026-05-field-trial-299.md](2026-05-field-trial-299.md) | validation field index 14         | done   | #42       |
| 300 | [2026-05-field-trial-300.md](2026-05-field-trial-300.md) | validation field index 15         | done   | #42       |
| 301 | [2026-05-field-trial-301.md](2026-05-field-trial-301.md) | validation field index 16         | done   | #42       |
| 302 | [2026-05-field-trial-302.md](2026-05-field-trial-302.md) | validation field index 17         | done   | #42       |
| 303 | [2026-05-field-trial-303.md](2026-05-field-trial-303.md) | validation field index 18         | done   | #42       |
| 304 | [2026-05-field-trial-304.md](2026-05-field-trial-304.md) | validation field index 19         | done   | #42       |
| 305 | [2026-05-field-trial-305.md](2026-05-field-trial-305.md) | validation field index 20         | done   | #42       |
| 306 | [2026-05-field-trial-306.md](2026-05-field-trial-306.md) | validation field index 21         | done   | #42       |
| 307 | [2026-05-field-trial-307.md](2026-05-field-trial-307.md) | validation field index 22         | done   | #42       |
| 308 | [2026-05-field-trial-308.md](2026-05-field-trial-308.md) | validation field index 23         | done   | #42       |
| 309 | [2026-05-field-trial-309.md](2026-05-field-trial-309.md) | validation field index 24         | done   | #42       |
| 310 | [2026-05-field-trial-310.md](2026-05-field-trial-310.md) | parseProblemDetails case 0        | done   | #42       |
| 311 | [2026-05-field-trial-311.md](2026-05-field-trial-311.md) | parseProblemDetails case 1        | done   | #42       |
| 312 | [2026-05-field-trial-312.md](2026-05-field-trial-312.md) | parseProblemDetails case 2        | done   | #42       |
| 313 | [2026-05-field-trial-313.md](2026-05-field-trial-313.md) | parseProblemDetails case 3        | done   | #42       |
| 314 | [2026-05-field-trial-314.md](2026-05-field-trial-314.md) | parseProblemDetails case 4        | done   | #42       |
| 315 | [2026-05-field-trial-315.md](2026-05-field-trial-315.md) | parseProblemDetails case 5        | done   | #42       |
| 316 | [2026-05-field-trial-316.md](2026-05-field-trial-316.md) | parseProblemDetails case 6        | done   | #42       |
| 317 | [2026-05-field-trial-317.md](2026-05-field-trial-317.md) | parseProblemDetails case 7        | done   | #42       |
| 318 | [2026-05-field-trial-318.md](2026-05-field-trial-318.md) | parseProblemDetails case 8        | done   | #42       |
| 319 | [2026-05-field-trial-319.md](2026-05-field-trial-319.md) | parseProblemDetails case 9        | done   | #42       |
| 320 | [2026-05-field-trial-320.md](2026-05-field-trial-320.md) | parseProblemDetails case 10       | done   | #42       |
| 321 | [2026-05-field-trial-321.md](2026-05-field-trial-321.md) | parseProblemDetails case 11       | done   | #42       |
| 322 | [2026-05-field-trial-322.md](2026-05-field-trial-322.md) | parseProblemDetails case 12       | done   | #42       |
| 323 | [2026-05-field-trial-323.md](2026-05-field-trial-323.md) | parseProblemDetails case 13       | done   | #42       |
| 324 | [2026-05-field-trial-324.md](2026-05-field-trial-324.md) | parseProblemDetails case 14       | done   | #42       |
| 325 | [2026-05-field-trial-325.md](2026-05-field-trial-325.md) | parseProblemDetails case 15       | done   | #42       |
| 326 | [2026-05-field-trial-326.md](2026-05-field-trial-326.md) | parseProblemDetails case 16       | done   | #42       |
| 327 | [2026-05-field-trial-327.md](2026-05-field-trial-327.md) | parseProblemDetails case 17       | done   | #42       |
| 328 | [2026-05-field-trial-328.md](2026-05-field-trial-328.md) | parseProblemDetails case 18       | done   | #42       |
| 329 | [2026-05-field-trial-329.md](2026-05-field-trial-329.md) | parseProblemDetails case 19       | done   | #42       |
| 330 | [2026-05-field-trial-330.md](2026-05-field-trial-330.md) | baseUrl variant 0                 | done   | #42       |
| 331 | [2026-05-field-trial-331.md](2026-05-field-trial-331.md) | baseUrl variant 1                 | done   | #42       |
| 332 | [2026-05-field-trial-332.md](2026-05-field-trial-332.md) | baseUrl variant 2                 | done   | #42       |
| 333 | [2026-05-field-trial-333.md](2026-05-field-trial-333.md) | baseUrl variant 3                 | done   | #42       |
| 334 | [2026-05-field-trial-334.md](2026-05-field-trial-334.md) | baseUrl variant 4                 | done   | #42       |
| 335 | [2026-05-field-trial-335.md](2026-05-field-trial-335.md) | auth header combo 0               | done   | #42       |
| 336 | [2026-05-field-trial-336.md](2026-05-field-trial-336.md) | auth header combo 1               | done   | #42       |
| 337 | [2026-05-field-trial-337.md](2026-05-field-trial-337.md) | auth header combo 2               | done   | #42       |
| 338 | [2026-05-field-trial-338.md](2026-05-field-trial-338.md) | auth header combo 3               | done   | #42       |
| 339 | [2026-05-field-trial-339.md](2026-05-field-trial-339.md) | auth header combo 4               | done   | #42       |
| 340 | [2026-05-field-trial-340.md](2026-05-field-trial-340.md) | auth header combo 5               | done   | #42       |
| 341 | [2026-05-field-trial-341.md](2026-05-field-trial-341.md) | auth header combo 6               | done   | #42       |
| 342 | [2026-05-field-trial-342.md](2026-05-field-trial-342.md) | auth header combo 7               | done   | #42       |
| 343 | [2026-05-field-trial-343.md](2026-05-field-trial-343.md) | auth header combo 8               | done   | #42       |
| 344 | [2026-05-field-trial-344.md](2026-05-field-trial-344.md) | auth header combo 9               | done   | #42       |
| 345 | [2026-05-field-trial-345.md](2026-05-field-trial-345.md) | auth header combo 10              | done   | #42       |
| 346 | [2026-05-field-trial-346.md](2026-05-field-trial-346.md) | auth header combo 11              | done   | #42       |
| 347 | [2026-05-field-trial-347.md](2026-05-field-trial-347.md) | auth header combo 12              | done   | #42       |
| 348 | [2026-05-field-trial-348.md](2026-05-field-trial-348.md) | auth header combo 13              | done   | #42       |
| 349 | [2026-05-field-trial-349.md](2026-05-field-trial-349.md) | auth header combo 14              | done   | #42       |
| 350 | [2026-05-field-trial-350.md](2026-05-field-trial-350.md) | parallel calls batch 0            | done   | #42       |
| 351 | [2026-05-field-trial-351.md](2026-05-field-trial-351.md) | parallel calls batch 1            | done   | #42       |
| 352 | [2026-05-field-trial-352.md](2026-05-field-trial-352.md) | parallel calls batch 2            | done   | #42       |
| 353 | [2026-05-field-trial-353.md](2026-05-field-trial-353.md) | parallel calls batch 3            | done   | #42       |
| 354 | [2026-05-field-trial-354.md](2026-05-field-trial-354.md) | parallel calls batch 4            | done   | #42       |
| 355 | [2026-05-field-trial-355.md](2026-05-field-trial-355.md) | parallel calls batch 5            | done   | #42       |
| 356 | [2026-05-field-trial-356.md](2026-05-field-trial-356.md) | parallel calls batch 6            | done   | #42       |
| 357 | [2026-05-field-trial-357.md](2026-05-field-trial-357.md) | parallel calls batch 7            | done   | #42       |
| 358 | [2026-05-field-trial-358.md](2026-05-field-trial-358.md) | parallel calls batch 8            | done   | #42       |
| 359 | [2026-05-field-trial-359.md](2026-05-field-trial-359.md) | parallel calls batch 9            | done   | #42       |
| 360 | [2026-05-field-trial-360.md](2026-05-field-trial-360.md) | parallel calls batch 10           | done   | #42       |
| 361 | [2026-05-field-trial-361.md](2026-05-field-trial-361.md) | parallel calls batch 11           | done   | #42       |
| 362 | [2026-05-field-trial-362.md](2026-05-field-trial-362.md) | generated schema probe 0          | done   | #42       |
| 363 | [2026-05-field-trial-363.md](2026-05-field-trial-363.md) | generated schema probe 1          | done   | #42       |
| 364 | [2026-05-field-trial-364.md](2026-05-field-trial-364.md) | generated schema probe 2          | done   | #42       |
| 365 | [2026-05-field-trial-365.md](2026-05-field-trial-365.md) | generated schema probe 3          | done   | #42       |
| 366 | [2026-05-field-trial-366.md](2026-05-field-trial-366.md) | generated schema probe 4          | done   | #42       |
| 367 | [2026-05-field-trial-367.md](2026-05-field-trial-367.md) | generated schema probe 5          | done   | #42       |
| 368 | [2026-05-field-trial-368.md](2026-05-field-trial-368.md) | generated schema probe 6          | done   | #42       |
| 369 | [2026-05-field-trial-369.md](2026-05-field-trial-369.md) | generated schema probe 7          | done   | #42       |
| 370 | [2026-05-field-trial-370.md](2026-05-field-trial-370.md) | generated schema probe 8          | done   | #42       |
| 371 | [2026-05-field-trial-371.md](2026-05-field-trial-371.md) | generated schema probe 9          | done   | #42       |
| 372 | [2026-05-field-trial-372.md](2026-05-field-trial-372.md) | fixture load not-found            | done   | #42       |
| 373 | [2026-05-field-trial-373.md](2026-05-field-trial-373.md) | fixture load validation-failed    | done   | #42       |
| 374 | [2026-05-field-trial-374.md](2026-05-field-trial-374.md) | fixture load payload-too-large    | done   | #42       |
| 375 | [2026-05-field-trial-375.md](2026-05-field-trial-375.md) | fixture load health-ok            | done   | #42       |
| 376 | [2026-05-field-trial-376.md](2026-05-field-trial-376.md) | fixture load ping-ok              | done   | #42       |
| 377 | [2026-05-field-trial-377.md](2026-05-field-trial-377.md) | fixture load note-ok              | done   | #42       |
| 378 | [2026-05-field-trial-378.md](2026-05-field-trial-378.md) | fixture load tag-ok               | done   | #42       |
| 379 | [2026-05-field-trial-379.md](2026-05-field-trial-379.md) | content-type variant 0            | done   | #42       |
| 380 | [2026-05-field-trial-380.md](2026-05-field-trial-380.md) | content-type variant 1            | done   | #42       |
| 381 | [2026-05-field-trial-381.md](2026-05-field-trial-381.md) | content-type variant 2            | done   | #42       |
| 382 | [2026-05-field-trial-382.md](2026-05-field-trial-382.md) | content-type variant 3            | done   | #42       |
| 383 | [2026-05-field-trial-383.md](2026-05-field-trial-383.md) | content-type variant 4            | done   | #42       |
| 384 | [2026-05-field-trial-384.md](2026-05-field-trial-384.md) | content-type variant 5            | done   | #42       |
| 385 | [2026-05-field-trial-385.md](2026-05-field-trial-385.md) | content-type variant 6            | done   | #42       |
| 386 | [2026-05-field-trial-386.md](2026-05-field-trial-386.md) | content-type variant 7            | done   | #42       |
| 387 | [2026-05-field-trial-387.md](2026-05-field-trial-387.md) | replay health_ok #0               | done   | #42       |
| 388 | [2026-05-field-trial-388.md](2026-05-field-trial-388.md) | replay ping_ok #1                 | done   | #42       |
| 389 | [2026-05-field-trial-389.md](2026-05-field-trial-389.md) | replay smoke_ok #2                | done   | #42       |
| 390 | [2026-05-field-trial-390.md](2026-05-field-trial-390.md) | replay notes_list #3              | done   | #42       |
| 391 | [2026-05-field-trial-391.md](2026-05-field-trial-391.md) | replay tags_list #4               | done   | #42       |
| 392 | [2026-05-field-trial-392.md](2026-05-field-trial-392.md) | replay protected_ok #5            | done   | #42       |
| 393 | [2026-05-field-trial-393.md](2026-05-field-trial-393.md) | replay err_422 #6                 | done   | #42       |
| 394 | [2026-05-field-trial-394.md](2026-05-field-trial-394.md) | replay prob_is_pd #7              | done   | #42       |
| 395 | [2026-05-field-trial-395.md](2026-05-field-trial-395.md) | replay vdx_by_field #8            | done   | #42       |
| 396 | [2026-05-field-trial-396.md](2026-05-field-trial-396.md) | replay machine_ok #9              | done   | #42       |
| 397 | [2026-05-field-trial-397.md](2026-05-field-trial-397.md) | replay health_ok #10              | done   | #42       |
| 398 | [2026-05-field-trial-398.md](2026-05-field-trial-398.md) | replay ping_ok #11                | done   | #42       |
| 399 | [2026-05-field-trial-399.md](2026-05-field-trial-399.md) | replay smoke_ok #12               | done   | #42       |
| 400 | [2026-05-field-trial-400.md](2026-05-field-trial-400.md) | replay notes_list #13             | done   | #42       |
| 401 | [2026-05-field-trial-401.md](2026-05-field-trial-401.md) | replay tags_list #14              | done   | #42       |
| 402 | [2026-05-field-trial-402.md](2026-05-field-trial-402.md) | replay protected_ok #15           | done   | #42       |
| 403 | [2026-05-field-trial-403.md](2026-05-field-trial-403.md) | replay err_422 #16                | done   | #42       |
| 404 | [2026-05-field-trial-404.md](2026-05-field-trial-404.md) | replay prob_is_pd #17             | done   | #42       |
| 405 | [2026-05-field-trial-405.md](2026-05-field-trial-405.md) | replay vdx_by_field #18           | done   | #42       |
| 406 | [2026-05-field-trial-406.md](2026-05-field-trial-406.md) | replay machine_ok #19             | done   | #42       |
| 407 | [2026-05-field-trial-407.md](2026-05-field-trial-407.md) | replay health_ok #20              | done   | #42       |
| 408 | [2026-05-field-trial-408.md](2026-05-field-trial-408.md) | replay ping_ok #21                | done   | #42       |
| 409 | [2026-05-field-trial-409.md](2026-05-field-trial-409.md) | replay smoke_ok #22               | done   | #42       |
| 410 | [2026-05-field-trial-410.md](2026-05-field-trial-410.md) | replay notes_list #23             | done   | #42       |
| 411 | [2026-05-field-trial-411.md](2026-05-field-trial-411.md) | replay tags_list #24              | done   | #42       |
| 412 | [2026-05-field-trial-412.md](2026-05-field-trial-412.md) | replay protected_ok #25           | done   | #42       |
| 413 | [2026-05-field-trial-413.md](2026-05-field-trial-413.md) | replay err_422 #26                | done   | #42       |
| 414 | [2026-05-field-trial-414.md](2026-05-field-trial-414.md) | replay prob_is_pd #27             | done   | #42       |
| 415 | [2026-05-field-trial-415.md](2026-05-field-trial-415.md) | replay vdx_by_field #28           | done   | #42       |
| 416 | [2026-05-field-trial-416.md](2026-05-field-trial-416.md) | replay machine_ok #29             | done   | #42       |
| 417 | [2026-05-field-trial-417.md](2026-05-field-trial-417.md) | misc client probe 0               | done   | #42       |
| 418 | [2026-05-field-trial-418.md](2026-05-field-trial-418.md) | misc client probe 1               | done   | #42       |
| 419 | [2026-05-field-trial-419.md](2026-05-field-trial-419.md) | misc client probe 2               | done   | #42       |
| 420 | [2026-05-field-trial-420.md](2026-05-field-trial-420.md) | misc client probe 3               | done   | #42       |
| 421 | [2026-05-field-trial-421.md](2026-05-field-trial-421.md) | misc client probe 4               | done   | #42       |
| 422 | [2026-05-field-trial-422.md](2026-05-field-trial-422.md) | misc client probe 5               | done   | #42       |
| 423 | [2026-05-field-trial-423.md](2026-05-field-trial-423.md) | misc client probe 6               | done   | #42       |
| 424 | [2026-05-field-trial-424.md](2026-05-field-trial-424.md) | misc client probe 7               | done   | #42       |
| 425 | [2026-05-field-trial-425.md](2026-05-field-trial-425.md) | misc client probe 8               | done   | #42       |
| 426 | [2026-05-field-trial-426.md](2026-05-field-trial-426.md) | misc client probe 9               | done   | #42       |
| 427 | [2026-05-field-trial-427.md](2026-05-field-trial-427.md) | misc client probe 10              | done   | #42       |
| 428 | [2026-05-field-trial-428.md](2026-05-field-trial-428.md) | misc client probe 11              | done   | #42       |
| 429 | [2026-05-field-trial-429.md](2026-05-field-trial-429.md) | misc client probe 12              | done   | #42       |
| 430 | [2026-05-field-trial-430.md](2026-05-field-trial-430.md) | misc client probe 13              | done   | #42       |
| 431 | [2026-05-field-trial-431.md](2026-05-field-trial-431.md) | misc client probe 14              | done   | #42       |
| 432 | [2026-05-field-trial-432.md](2026-05-field-trial-432.md) | misc client probe 15              | done   | #42       |
| 433 | [2026-05-field-trial-433.md](2026-05-field-trial-433.md) | misc client probe 16              | done   | #42       |
| 434 | [2026-05-field-trial-434.md](2026-05-field-trial-434.md) | misc client probe 17              | done   | #42       |
| 435 | [2026-05-field-trial-435.md](2026-05-field-trial-435.md) | misc client probe 18              | done   | #42       |
| 436 | [2026-05-field-trial-436.md](2026-05-field-trial-436.md) | misc client probe 19              | done   | #42       |
| 437 | [2026-05-field-trial-437.md](2026-05-field-trial-437.md) | misc client probe 20              | done   | #42       |
| 438 | [2026-05-field-trial-438.md](2026-05-field-trial-438.md) | misc client probe 21              | done   | #42       |
| 439 | [2026-05-field-trial-439.md](2026-05-field-trial-439.md) | misc client probe 22              | done   | #42       |
| 440 | [2026-05-field-trial-440.md](2026-05-field-trial-440.md) | misc client probe 23              | done   | #42       |
| 441 | [2026-05-field-trial-441.md](2026-05-field-trial-441.md) | misc client probe 24              | done   | #42       |
| 442 | [2026-05-field-trial-442.md](2026-05-field-trial-442.md) | misc client probe 25              | done   | #42       |
| 443 | [2026-05-field-trial-443.md](2026-05-field-trial-443.md) | misc client probe 26              | done   | #42       |
| 444 | [2026-05-field-trial-444.md](2026-05-field-trial-444.md) | misc client probe 27              | done   | #42       |
| 445 | [2026-05-field-trial-445.md](2026-05-field-trial-445.md) | misc client probe 28              | done   | #42       |
| 446 | [2026-05-field-trial-446.md](2026-05-field-trial-446.md) | misc client probe 29              | done   | #42       |
| 447 | [2026-05-field-trial-447.md](2026-05-field-trial-447.md) | misc client probe 30              | done   | #42       |
| 448 | [2026-05-field-trial-448.md](2026-05-field-trial-448.md) | misc client probe 31              | done   | #42       |
| 449 | [2026-05-field-trial-449.md](2026-05-field-trial-449.md) | misc client probe 32              | done   | #42       |
| 450 | [2026-05-field-trial-450.md](2026-05-field-trial-450.md) | misc client probe 33              | done   | #42       |
| 451 | [2026-05-field-trial-451.md](2026-05-field-trial-451.md) | misc client probe 34              | done   | #42       |
| 452 | [2026-05-field-trial-452.md](2026-05-field-trial-452.md) | misc client probe 35              | done   | #42       |
| 453 | [2026-05-field-trial-453.md](2026-05-field-trial-453.md) | misc client probe 36              | done   | #42       |
| 454 | [2026-05-field-trial-454.md](2026-05-field-trial-454.md) | misc client probe 37              | done   | #42       |
| 455 | [2026-05-field-trial-455.md](2026-05-field-trial-455.md) | misc client probe 38              | done   | #42       |
| 456 | [2026-05-field-trial-456.md](2026-05-field-trial-456.md) | misc client probe 39              | done   | #42       |
| 457 | [2026-05-field-trial-457.md](2026-05-field-trial-457.md) | misc client probe 40              | done   | #42       |
| 458 | [2026-05-field-trial-458.md](2026-05-field-trial-458.md) | misc client probe 41              | done   | #42       |
| 459 | [2026-05-field-trial-459.md](2026-05-field-trial-459.md) | misc client probe 42              | done   | #42       |
| 460 | [2026-05-field-trial-460.md](2026-05-field-trial-460.md) | misc client probe 43              | done   | #42       |
| 461 | [2026-05-field-trial-461.md](2026-05-field-trial-461.md) | misc client probe 44              | done   | #42       |
| 462 | [2026-05-field-trial-462.md](2026-05-field-trial-462.md) | misc client probe 45              | done   | #42       |
| 463 | [2026-05-field-trial-463.md](2026-05-field-trial-463.md) | misc client probe 46              | done   | #42       |
| 464 | [2026-05-field-trial-464.md](2026-05-field-trial-464.md) | misc client probe 47              | done   | #42       |
| 465 | [2026-05-field-trial-465.md](2026-05-field-trial-465.md) | misc client probe 48              | done   | #42       |
| 466 | [2026-05-field-trial-466.md](2026-05-field-trial-466.md) | misc client probe 49              | done   | #42       |
| 467 | [2026-05-field-trial-467.md](2026-05-field-trial-467.md) | misc client probe 50              | done   | #42       |
| 468 | [2026-05-field-trial-468.md](2026-05-field-trial-468.md) | misc client probe 51              | done   | #42       |
| 469 | [2026-05-field-trial-469.md](2026-05-field-trial-469.md) | misc client probe 52              | done   | #42       |
| 470 | [2026-05-field-trial-470.md](2026-05-field-trial-470.md) | misc client probe 53              | done   | #42       |
| 471 | [2026-05-field-trial-471.md](2026-05-field-trial-471.md) | misc client probe 54              | done   | #42       |
| 472 | [2026-05-field-trial-472.md](2026-05-field-trial-472.md) | misc client probe 55              | done   | #42       |
| 473 | [2026-05-field-trial-473.md](2026-05-field-trial-473.md) | misc client probe 56              | done   | #42       |
| 474 | [2026-05-field-trial-474.md](2026-05-field-trial-474.md) | misc client probe 57              | done   | #42       |
| 475 | [2026-05-field-trial-475.md](2026-05-field-trial-475.md) | misc client probe 58              | done   | #42       |
| 476 | [2026-05-field-trial-476.md](2026-05-field-trial-476.md) | misc client probe 59              | done   | #42       |
| 477 | [2026-05-field-trial-477.md](2026-05-field-trial-477.md) | misc client probe 60              | done   | #42       |
| 478 | [2026-05-field-trial-478.md](2026-05-field-trial-478.md) | misc client probe 61              | done   | #42       |
| 479 | [2026-05-field-trial-479.md](2026-05-field-trial-479.md) | misc client probe 62              | done   | #42       |
| 480 | [2026-05-field-trial-480.md](2026-05-field-trial-480.md) | misc client probe 63              | done   | #42       |
| 481 | [2026-05-field-trial-481.md](2026-05-field-trial-481.md) | misc client probe 64              | done   | #42       |
| 482 | [2026-05-field-trial-482.md](2026-05-field-trial-482.md) | misc client probe 65              | done   | #42       |
| 483 | [2026-05-field-trial-483.md](2026-05-field-trial-483.md) | misc client probe 66              | done   | #42       |
| 484 | [2026-05-field-trial-484.md](2026-05-field-trial-484.md) | misc client probe 67              | done   | #42       |
| 485 | [2026-05-field-trial-485.md](2026-05-field-trial-485.md) | misc client probe 68              | done   | #42       |
| 486 | [2026-05-field-trial-486.md](2026-05-field-trial-486.md) | misc client probe 69              | done   | #42       |
| 487 | [2026-05-field-trial-487.md](2026-05-field-trial-487.md) | misc client probe 70              | done   | #42       |
| 488 | [2026-05-field-trial-488.md](2026-05-field-trial-488.md) | misc client probe 71              | done   | #42       |
| 489 | [2026-05-field-trial-489.md](2026-05-field-trial-489.md) | misc client probe 72              | done   | #42       |
| 490 | [2026-05-field-trial-490.md](2026-05-field-trial-490.md) | misc client probe 73              | done   | #42       |
| 491 | [2026-05-field-trial-491.md](2026-05-field-trial-491.md) | misc client probe 74              | done   | #42       |
| 492 | [2026-05-field-trial-492.md](2026-05-field-trial-492.md) | misc client probe 75              | done   | #42       |
| 493 | [2026-05-field-trial-493.md](2026-05-field-trial-493.md) | misc client probe 76              | done   | #42       |
| 494 | [2026-05-field-trial-494.md](2026-05-field-trial-494.md) | misc client probe 77              | done   | #42       |
| 495 | [2026-05-field-trial-495.md](2026-05-field-trial-495.md) | misc client probe 78              | done   | #42       |
| 496 | [2026-05-field-trial-496.md](2026-05-field-trial-496.md) | misc client probe 79              | done   | #42       |
| 497 | [2026-05-field-trial-497.md](2026-05-field-trial-497.md) | misc client probe 80              | done   | #42       |
| 498 | [2026-05-field-trial-498.md](2026-05-field-trial-498.md) | misc client probe 81              | done   | #42       |
| 499 | [2026-05-field-trial-499.md](2026-05-field-trial-499.md) | misc client probe 82              | done   | #42       |
| 500 | [2026-05-field-trial-500.md](2026-05-field-trial-500.md) | misc client probe 83              | done   | #42       |
| 501 | [2026-05-field-trial-501.md](2026-05-field-trial-501.md) | misc client probe 84              | done   | #42       |
| 502 | [2026-05-field-trial-502.md](2026-05-field-trial-502.md) | misc client probe 85              | done   | #42       |
| 503 | [2026-05-field-trial-503.md](2026-05-field-trial-503.md) | misc client probe 86              | done   | #42       |
| 504 | [2026-05-field-trial-504.md](2026-05-field-trial-504.md) | misc client probe 87              | done   | #42       |
| 505 | [2026-05-field-trial-505.md](2026-05-field-trial-505.md) | misc client probe 88              | done   | #42       |
| 506 | [2026-05-field-trial-506.md](2026-05-field-trial-506.md) | misc client probe 89              | done   | #42       |
| 507 | [2026-05-field-trial-507.md](2026-05-field-trial-507.md) | misc client probe 90              | done   | #42       |
| 508 | [2026-05-field-trial-508.md](2026-05-field-trial-508.md) | misc client probe 91              | done   | #42       |
| 509 | [2026-05-field-trial-509.md](2026-05-field-trial-509.md) | misc client probe 92              | done   | #42       |
| 510 | [2026-05-field-trial-510.md](2026-05-field-trial-510.md) | misc client probe 93              | done   | #42       |
| 511 | [2026-05-field-trial-511.md](2026-05-field-trial-511.md) | misc client probe 94              | done   | #42       |
| 512 | [2026-05-field-trial-512.md](2026-05-field-trial-512.md) | misc client probe 95              | done   | #42       |
| 513 | [2026-05-field-trial-513.md](2026-05-field-trial-513.md) | misc client probe 96              | done   | #42       |
| 514 | [2026-05-field-trial-514.md](2026-05-field-trial-514.md) | misc client probe 97              | done   | #42       |
| 515 | [2026-05-field-trial-515.md](2026-05-field-trial-515.md) | misc client probe 98              | done   | #42       |
| 516 | [2026-05-field-trial-516.md](2026-05-field-trial-516.md) | misc client probe 99              | done   | #42       |
| 517 | [2026-05-field-trial-517.md](2026-05-field-trial-517.md) | misc client probe 100             | done   | #42       |
| 518 | [2026-05-field-trial-518.md](2026-05-field-trial-518.md) | misc client probe 101             | done   | #42       |
| 519 | [2026-05-field-trial-519.md](2026-05-field-trial-519.md) | misc client probe 102             | done   | #42       |
| 520 | [2026-05-field-trial-520.md](2026-05-field-trial-520.md) | misc client probe 103             | done   | #42       |
| 521 | [2026-05-field-trial-521.md](2026-05-field-trial-521.md) | misc client probe 104             | done   | #42       |
| 522 | [2026-05-field-trial-522.md](2026-05-field-trial-522.md) | misc client probe 105             | done   | #42       |
| 523 | [2026-05-field-trial-523.md](2026-05-field-trial-523.md) | misc client probe 106             | done   | #42       |
| 524 | [2026-05-field-trial-524.md](2026-05-field-trial-524.md) | misc client probe 107             | done   | #42       |
| 525 | [2026-05-field-trial-525.md](2026-05-field-trial-525.md) | misc client probe 108             | done   | #42       |
| 526 | [2026-05-field-trial-526.md](2026-05-field-trial-526.md) | misc client probe 109             | done   | #42       |
| 527 | [2026-05-field-trial-527.md](2026-05-field-trial-527.md) | misc client probe 110             | done   | #42       |
| 528 | [2026-05-field-trial-528.md](2026-05-field-trial-528.md) | misc client probe 111             | done   | #42       |
| 529 | [2026-05-field-trial-529.md](2026-05-field-trial-529.md) | misc client probe 112             | done   | #42       |

**`done`** = friction resolution cycle complete. Marathon batch: Issue [#42](https://github.com/hideyukiMORI/nene2-js/issues/42) (FT30–529). Run `npm run test:ft-marathon`.
