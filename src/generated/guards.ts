/**
 * @generated from contracts/openapi.yaml — do not edit.
 * Regenerate: npm run codegen:guards
 * @see docs/adr/0007-openapi-guard-codegen-ajv-standalone.md
 */
/* eslint-disable */
// @ts-nocheck

function ucs2length(str: string): number {
  return [...str].length;
}

const schema_HealthResponse = {"type":"object","required":["status","service"],"properties":{"status":{"type":"string","enum":["ok","degraded"],"example":"ok"},"service":{"type":"string","example":"NENE2"},"checks":{"type":"object","description":"Present only when health checks are configured. Each key is a check name; each value is \"ok\" or \"error\".\n","additionalProperties":{"type":"string","enum":["ok","error"]},"example":{"database":"ok"}}}};

export function validateHealthResponse(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if(((data.status === undefined) && (missing0 = "status")) || ((data.service === undefined) && (missing0 = "service"))){
validateHealthResponse.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
if(data.status !== undefined){
let data0 = data.status;
const _errs1 = errors;
if(typeof data0 !== "string"){
validateHealthResponse.errors = [{instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
if(!((data0 === "ok") || (data0 === "degraded"))){
validateHealthResponse.errors = [{instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema_HealthResponse.properties.status.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid0 = _errs1 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.service !== undefined){
const _errs3 = errors;
if(typeof data.service !== "string"){
validateHealthResponse.errors = [{instancePath:instancePath+"/service",schemaPath:"#/properties/service/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs3 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.checks !== undefined){
let data2 = data.checks;
const _errs5 = errors;
if(errors === _errs5){
if(data2 && typeof data2 == "object" && !Array.isArray(data2)){
for(const key0 in data2){
let data3 = data2[key0];
const _errs8 = errors;
if(typeof data3 !== "string"){
validateHealthResponse.errors = [{instancePath:instancePath+"/checks/" + key0.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/checks/additionalProperties/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
if(!((data3 === "ok") || (data3 === "error"))){
validateHealthResponse.errors = [{instancePath:instancePath+"/checks/" + key0.replace(/~/g, "~0").replace(/\//g, "~1"),schemaPath:"#/properties/checks/additionalProperties/enum",keyword:"enum",params:{allowedValues: schema_HealthResponse.properties.checks.additionalProperties.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid1 = _errs8 === errors;
if(!valid1){
break;
}
}
}
else {
validateHealthResponse.errors = [{instancePath:instancePath+"/checks",schemaPath:"#/properties/checks/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs5 === errors;
}
else {
var valid0 = true;
}
}
}
}
}
else {
validateHealthResponse.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateHealthResponse.errors = vErrors;
return errors === 0;
}

const schema_ExamplePingResponse = {"type":"object","required":["message","status"],"properties":{"message":{"type":"string","enum":["pong"],"example":"pong"},"status":{"type":"string","enum":["ok"],"example":"ok"}}};

export function validateExamplePingResponse(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if(((data.message === undefined) && (missing0 = "message")) || ((data.status === undefined) && (missing0 = "status"))){
validateExamplePingResponse.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
if(data.message !== undefined){
let data0 = data.message;
const _errs1 = errors;
if(typeof data0 !== "string"){
validateExamplePingResponse.errors = [{instancePath:instancePath+"/message",schemaPath:"#/properties/message/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
if(!(data0 === "pong")){
validateExamplePingResponse.errors = [{instancePath:instancePath+"/message",schemaPath:"#/properties/message/enum",keyword:"enum",params:{allowedValues: schema_ExamplePingResponse.properties.message.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid0 = _errs1 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.status !== undefined){
let data1 = data.status;
const _errs3 = errors;
if(typeof data1 !== "string"){
validateExamplePingResponse.errors = [{instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
if(!(data1 === "ok")){
validateExamplePingResponse.errors = [{instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema_ExamplePingResponse.properties.status.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid0 = _errs3 === errors;
}
else {
var valid0 = true;
}
}
}
}
else {
validateExamplePingResponse.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateExamplePingResponse.errors = vErrors;
return errors === 0;
}

const schema_FrameworkSmokeResponse = {"type":"object","required":["name","description","status"],"properties":{"name":{"type":"string","example":"NENE2"},"description":{"type":"string","example":"JSON APIs first, minimal server HTML, frontend ready, AI-readable."},"status":{"type":"string","enum":["ok"],"example":"ok"}}};

export function validateFrameworkSmokeResponse(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((((data.name === undefined) && (missing0 = "name")) || ((data.description === undefined) && (missing0 = "description"))) || ((data.status === undefined) && (missing0 = "status"))){
validateFrameworkSmokeResponse.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
if(data.name !== undefined){
const _errs1 = errors;
if(typeof data.name !== "string"){
validateFrameworkSmokeResponse.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs1 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.description !== undefined){
const _errs3 = errors;
if(typeof data.description !== "string"){
validateFrameworkSmokeResponse.errors = [{instancePath:instancePath+"/description",schemaPath:"#/properties/description/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs3 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.status !== undefined){
let data2 = data.status;
const _errs5 = errors;
if(typeof data2 !== "string"){
validateFrameworkSmokeResponse.errors = [{instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
if(!(data2 === "ok")){
validateFrameworkSmokeResponse.errors = [{instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema_FrameworkSmokeResponse.properties.status.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid0 = _errs5 === errors;
}
else {
var valid0 = true;
}
}
}
}
}
else {
validateFrameworkSmokeResponse.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateFrameworkSmokeResponse.errors = vErrors;
return errors === 0;
}

const schema_MachineHealthResponse = {"type":"object","required":["status","service","credential_type"],"properties":{"status":{"type":"string","enum":["ok"],"example":"ok"},"service":{"type":"string","example":"NENE2"},"credential_type":{"type":"string","enum":["api_key"],"example":"api_key"}}};

export function validateMachineHealthResponse(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((((data.status === undefined) && (missing0 = "status")) || ((data.service === undefined) && (missing0 = "service"))) || ((data.credential_type === undefined) && (missing0 = "credential_type"))){
validateMachineHealthResponse.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
if(data.status !== undefined){
let data0 = data.status;
const _errs1 = errors;
if(typeof data0 !== "string"){
validateMachineHealthResponse.errors = [{instancePath:instancePath+"/status",schemaPath:"#/properties/status/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
if(!(data0 === "ok")){
validateMachineHealthResponse.errors = [{instancePath:instancePath+"/status",schemaPath:"#/properties/status/enum",keyword:"enum",params:{allowedValues: schema_MachineHealthResponse.properties.status.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid0 = _errs1 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.service !== undefined){
const _errs3 = errors;
if(typeof data.service !== "string"){
validateMachineHealthResponse.errors = [{instancePath:instancePath+"/service",schemaPath:"#/properties/service/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs3 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.credential_type !== undefined){
let data2 = data.credential_type;
const _errs5 = errors;
if(typeof data2 !== "string"){
validateMachineHealthResponse.errors = [{instancePath:instancePath+"/credential_type",schemaPath:"#/properties/credential_type/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
if(!(data2 === "api_key")){
validateMachineHealthResponse.errors = [{instancePath:instancePath+"/credential_type",schemaPath:"#/properties/credential_type/enum",keyword:"enum",params:{allowedValues: schema_MachineHealthResponse.properties.credential_type.enum},message:"must be equal to one of the allowed values"}];
return false;
}
var valid0 = _errs5 === errors;
}
else {
var valid0 = true;
}
}
}
}
}
else {
validateMachineHealthResponse.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateMachineHealthResponse.errors = vErrors;
return errors === 0;
}

const schema_ExampleNoteResponse = {"type":"object","required":["id","title","body"],"properties":{"id":{"type":"integer","example":1},"title":{"type":"string","example":"Example Note"},"body":{"type":"string","example":"This is the body of an example note."}}};

export function validateExampleNoteResponse(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((((data.id === undefined) && (missing0 = "id")) || ((data.title === undefined) && (missing0 = "title"))) || ((data.body === undefined) && (missing0 = "body"))){
validateExampleNoteResponse.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
if(data.id !== undefined){
let data0 = data.id;
const _errs1 = errors;
if(!((typeof data0 == "number") && (!(data0 % 1) && !isNaN(data0)))){
validateExampleNoteResponse.errors = [{instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
var valid0 = _errs1 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.title !== undefined){
const _errs3 = errors;
if(typeof data.title !== "string"){
validateExampleNoteResponse.errors = [{instancePath:instancePath+"/title",schemaPath:"#/properties/title/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs3 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.body !== undefined){
const _errs5 = errors;
if(typeof data.body !== "string"){
validateExampleNoteResponse.errors = [{instancePath:instancePath+"/body",schemaPath:"#/properties/body/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs5 === errors;
}
else {
var valid0 = true;
}
}
}
}
}
else {
validateExampleNoteResponse.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateExampleNoteResponse.errors = vErrors;
return errors === 0;
}

const schema_ExampleNoteListResponse = {"type":"object","required":["items","limit","offset"],"properties":{"items":{"type":"array","items":{"type":"object","required":["id","title","body"],"properties":{"id":{"type":"integer","example":1},"title":{"type":"string","example":"Example Note"},"body":{"type":"string","example":"This is the body of an example note."}}}},"limit":{"type":"integer","example":20},"offset":{"type":"integer","example":0}}};

export function validateExampleNoteListResponse(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((((data.items === undefined) && (missing0 = "items")) || ((data.limit === undefined) && (missing0 = "limit"))) || ((data.offset === undefined) && (missing0 = "offset"))){
validateExampleNoteListResponse.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
if(data.items !== undefined){
let data0 = data.items;
const _errs1 = errors;
if(errors === _errs1){
if(Array.isArray(data0)){
var valid1 = true;
const len0 = data0.length;
for(let i0=0; i0<len0; i0++){
let data1 = data0[i0];
const _errs3 = errors;
if(errors === _errs3){
if(data1 && typeof data1 == "object" && !Array.isArray(data1)){
let missing1;
if((((data1.id === undefined) && (missing1 = "id")) || ((data1.title === undefined) && (missing1 = "title"))) || ((data1.body === undefined) && (missing1 = "body"))){
validateExampleNoteListResponse.errors = [{instancePath:instancePath+"/items/" + i0,schemaPath:"#/properties/items/items/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"}];
return false;
}
else {
if(data1.id !== undefined){
let data2 = data1.id;
const _errs5 = errors;
if(!((typeof data2 == "number") && (!(data2 % 1) && !isNaN(data2)))){
validateExampleNoteListResponse.errors = [{instancePath:instancePath+"/items/" + i0+"/id",schemaPath:"#/properties/items/items/properties/id/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
var valid2 = _errs5 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data1.title !== undefined){
const _errs7 = errors;
if(typeof data1.title !== "string"){
validateExampleNoteListResponse.errors = [{instancePath:instancePath+"/items/" + i0+"/title",schemaPath:"#/properties/items/items/properties/title/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid2 = _errs7 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data1.body !== undefined){
const _errs9 = errors;
if(typeof data1.body !== "string"){
validateExampleNoteListResponse.errors = [{instancePath:instancePath+"/items/" + i0+"/body",schemaPath:"#/properties/items/items/properties/body/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid2 = _errs9 === errors;
}
else {
var valid2 = true;
}
}
}
}
}
else {
validateExampleNoteListResponse.errors = [{instancePath:instancePath+"/items/" + i0,schemaPath:"#/properties/items/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid1 = _errs3 === errors;
if(!valid1){
break;
}
}
}
else {
validateExampleNoteListResponse.errors = [{instancePath:instancePath+"/items",schemaPath:"#/properties/items/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs1 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.limit !== undefined){
let data5 = data.limit;
const _errs11 = errors;
if(!((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5)))){
validateExampleNoteListResponse.errors = [{instancePath:instancePath+"/limit",schemaPath:"#/properties/limit/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
var valid0 = _errs11 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.offset !== undefined){
let data6 = data.offset;
const _errs13 = errors;
if(!((typeof data6 == "number") && (!(data6 % 1) && !isNaN(data6)))){
validateExampleNoteListResponse.errors = [{instancePath:instancePath+"/offset",schemaPath:"#/properties/offset/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
var valid0 = _errs13 === errors;
}
else {
var valid0 = true;
}
}
}
}
}
else {
validateExampleNoteListResponse.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateExampleNoteListResponse.errors = vErrors;
return errors === 0;
}

const schema_CreateNoteRequest = {"type":"object","required":["title","body"],"properties":{"title":{"type":"string","minLength":1,"example":"Example Note"},"body":{"type":"string","minLength":1,"example":"This is the body of an example note."}},"additionalProperties":false};


export function validateCreateNoteRequest(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if(((data.title === undefined) && (missing0 = "title")) || ((data.body === undefined) && (missing0 = "body"))){
validateCreateNoteRequest.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!((key0 === "title") || (key0 === "body"))){
validateCreateNoteRequest.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs1 === errors){
if(data.title !== undefined){
let data0 = data.title;
const _errs2 = errors;
if(errors === _errs2){
if(typeof data0 === "string"){
if(ucs2length(data0) < 1){
validateCreateNoteRequest.errors = [{instancePath:instancePath+"/title",schemaPath:"#/properties/title/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"}];
return false;
}
}
else {
validateCreateNoteRequest.errors = [{instancePath:instancePath+"/title",schemaPath:"#/properties/title/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs2 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.body !== undefined){
let data1 = data.body;
const _errs4 = errors;
if(errors === _errs4){
if(typeof data1 === "string"){
if(ucs2length(data1) < 1){
validateCreateNoteRequest.errors = [{instancePath:instancePath+"/body",schemaPath:"#/properties/body/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"}];
return false;
}
}
else {
validateCreateNoteRequest.errors = [{instancePath:instancePath+"/body",schemaPath:"#/properties/body/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
var valid0 = _errs4 === errors;
}
else {
var valid0 = true;
}
}
}
}
}
else {
validateCreateNoteRequest.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateCreateNoteRequest.errors = vErrors;
return errors === 0;
}

const schema_ExampleTagResponse = {"type":"object","required":["id","name"],"properties":{"id":{"type":"integer","example":1},"name":{"type":"string","example":"php"}}};

export function validateExampleTagResponse(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if(((data.id === undefined) && (missing0 = "id")) || ((data.name === undefined) && (missing0 = "name"))){
validateExampleTagResponse.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
if(data.id !== undefined){
let data0 = data.id;
const _errs1 = errors;
if(!((typeof data0 == "number") && (!(data0 % 1) && !isNaN(data0)))){
validateExampleTagResponse.errors = [{instancePath:instancePath+"/id",schemaPath:"#/properties/id/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
var valid0 = _errs1 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.name !== undefined){
const _errs3 = errors;
if(typeof data.name !== "string"){
validateExampleTagResponse.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs3 === errors;
}
else {
var valid0 = true;
}
}
}
}
else {
validateExampleTagResponse.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateExampleTagResponse.errors = vErrors;
return errors === 0;
}

const schema_ExampleTagListResponse = {"type":"object","required":["items","limit","offset"],"properties":{"items":{"type":"array","items":{"type":"object","required":["id","name"],"properties":{"id":{"type":"integer","example":1},"name":{"type":"string","example":"php"}}}},"limit":{"type":"integer","example":20},"offset":{"type":"integer","example":0}}};

export function validateExampleTagListResponse(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((((data.items === undefined) && (missing0 = "items")) || ((data.limit === undefined) && (missing0 = "limit"))) || ((data.offset === undefined) && (missing0 = "offset"))){
validateExampleTagListResponse.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
if(data.items !== undefined){
let data0 = data.items;
const _errs1 = errors;
if(errors === _errs1){
if(Array.isArray(data0)){
var valid1 = true;
const len0 = data0.length;
for(let i0=0; i0<len0; i0++){
let data1 = data0[i0];
const _errs3 = errors;
if(errors === _errs3){
if(data1 && typeof data1 == "object" && !Array.isArray(data1)){
let missing1;
if(((data1.id === undefined) && (missing1 = "id")) || ((data1.name === undefined) && (missing1 = "name"))){
validateExampleTagListResponse.errors = [{instancePath:instancePath+"/items/" + i0,schemaPath:"#/properties/items/items/required",keyword:"required",params:{missingProperty: missing1},message:"must have required property '"+missing1+"'"}];
return false;
}
else {
if(data1.id !== undefined){
let data2 = data1.id;
const _errs5 = errors;
if(!((typeof data2 == "number") && (!(data2 % 1) && !isNaN(data2)))){
validateExampleTagListResponse.errors = [{instancePath:instancePath+"/items/" + i0+"/id",schemaPath:"#/properties/items/items/properties/id/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
var valid2 = _errs5 === errors;
}
else {
var valid2 = true;
}
if(valid2){
if(data1.name !== undefined){
const _errs7 = errors;
if(typeof data1.name !== "string"){
validateExampleTagListResponse.errors = [{instancePath:instancePath+"/items/" + i0+"/name",schemaPath:"#/properties/items/items/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid2 = _errs7 === errors;
}
else {
var valid2 = true;
}
}
}
}
else {
validateExampleTagListResponse.errors = [{instancePath:instancePath+"/items/" + i0,schemaPath:"#/properties/items/items/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid1 = _errs3 === errors;
if(!valid1){
break;
}
}
}
else {
validateExampleTagListResponse.errors = [{instancePath:instancePath+"/items",schemaPath:"#/properties/items/type",keyword:"type",params:{type: "array"},message:"must be array"}];
return false;
}
}
var valid0 = _errs1 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.limit !== undefined){
let data4 = data.limit;
const _errs9 = errors;
if(!((typeof data4 == "number") && (!(data4 % 1) && !isNaN(data4)))){
validateExampleTagListResponse.errors = [{instancePath:instancePath+"/limit",schemaPath:"#/properties/limit/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
var valid0 = _errs9 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.offset !== undefined){
let data5 = data.offset;
const _errs11 = errors;
if(!((typeof data5 == "number") && (!(data5 % 1) && !isNaN(data5)))){
validateExampleTagListResponse.errors = [{instancePath:instancePath+"/offset",schemaPath:"#/properties/offset/type",keyword:"type",params:{type: "integer"},message:"must be integer"}];
return false;
}
var valid0 = _errs11 === errors;
}
else {
var valid0 = true;
}
}
}
}
}
else {
validateExampleTagListResponse.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateExampleTagListResponse.errors = vErrors;
return errors === 0;
}

const schema_CreateTagRequest = {"type":"object","required":["name"],"properties":{"name":{"type":"string","minLength":1,"example":"php"}},"additionalProperties":false};


export function validateCreateTagRequest(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if((data.name === undefined) && (missing0 = "name")){
validateCreateTagRequest.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
const _errs1 = errors;
for(const key0 in data){
if(!(key0 === "name")){
validateCreateTagRequest.errors = [{instancePath,schemaPath:"#/additionalProperties",keyword:"additionalProperties",params:{additionalProperty: key0},message:"must NOT have additional properties"}];
return false;
break;
}
}
if(_errs1 === errors){
if(data.name !== undefined){
let data0 = data.name;
const _errs2 = errors;
if(errors === _errs2){
if(typeof data0 === "string"){
if(ucs2length(data0) < 1){
validateCreateTagRequest.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/minLength",keyword:"minLength",params:{limit: 1},message:"must NOT have fewer than 1 characters"}];
return false;
}
}
else {
validateCreateTagRequest.errors = [{instancePath:instancePath+"/name",schemaPath:"#/properties/name/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
}
}
}
}
}
else {
validateCreateTagRequest.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateCreateTagRequest.errors = vErrors;
return errors === 0;
}

const schema_ProtectedResponse = {"type":"object","required":["message","claims"],"properties":{"message":{"type":"string","example":"Welcome, authenticated user."},"claims":{"type":"object","additionalProperties":true,"example":{"sub":"user-42","scope":"read:system"}}}};

export function validateProtectedResponse(data, {instancePath="", parentData, parentDataProperty, rootData=data}={}){
let vErrors = null;
let errors = 0;
if(errors === 0){
if(data && typeof data == "object" && !Array.isArray(data)){
let missing0;
if(((data.message === undefined) && (missing0 = "message")) || ((data.claims === undefined) && (missing0 = "claims"))){
validateProtectedResponse.errors = [{instancePath,schemaPath:"#/required",keyword:"required",params:{missingProperty: missing0},message:"must have required property '"+missing0+"'"}];
return false;
}
else {
if(data.message !== undefined){
const _errs1 = errors;
if(typeof data.message !== "string"){
validateProtectedResponse.errors = [{instancePath:instancePath+"/message",schemaPath:"#/properties/message/type",keyword:"type",params:{type: "string"},message:"must be string"}];
return false;
}
var valid0 = _errs1 === errors;
}
else {
var valid0 = true;
}
if(valid0){
if(data.claims !== undefined){
let data1 = data.claims;
const _errs3 = errors;
if(errors === _errs3){
if(data1 && typeof data1 == "object" && !Array.isArray(data1)){
}
else {
validateProtectedResponse.errors = [{instancePath:instancePath+"/claims",schemaPath:"#/properties/claims/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
var valid0 = _errs3 === errors;
}
else {
var valid0 = true;
}
}
}
}
else {
validateProtectedResponse.errors = [{instancePath,schemaPath:"#/type",keyword:"type",params:{type: "object"},message:"must be object"}];
return false;
}
}
validateProtectedResponse.errors = vErrors;
return errors === 0;
}
