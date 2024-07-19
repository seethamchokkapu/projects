let queriesList = {
    query: "SELECT account_id,account_name,account_prefix,description,account_revenue,domain_id,planned_start_date,planned_end_date,account_start_date,account_end_date,address1,address2,city,state,zipcode,country,contact_email1,contact_email2,contact_num1,contact_num2,is_red,account_logo,account_url,account_phase_id,is_active,client_spoc,spoc_designation FROM DBO.account WHERE account_name = 'testAccount5056'",
    queryF: "SELECT account_id,account_name,account_prefix,description,account_revenue,domain_id,planned_start_date,planned_end_date,account_start_date,account_end_date,address1,address2,city,state,zipcode,country,contact_email1,contact_email2,contact_num1,contact_num2,is_red,account_logo,account_url,account_phase_id,is_active,client_spoc,spoc_designation FROM DBO.account WHERE account_name = 'testAccountFail'",
    query1: "SELECT account_project_id, project_id, name, description, account_id, planned_start_date, planned_end_date, actual_start_date, actual_end_date, status, priority, is_red, project_cost_usd, client_spoc, projectmanager_id, project_phase_id, contract_type, no_of_billing_hours, allocation_type, latest_po_number, is_active, created_on, created_by, modified_on, modified_by FROM FIRM_POC.dbo.account_projects WHERE name='TestProject'",
    query1F: "SELECT account_project_id, project_id, name, description, account_id, planned_start_date, planned_end_date, actual_start_date, actual_end_date, status, priority, is_red, project_cost_usd, client_spoc, projectmanager_id, project_phase_id, contract_type, no_of_billing_hours, allocation_type, latest_po_number, is_active, created_on, created_by, modified_on, modified_by FROM FIRM_POC.dbo.account_projects WHERE name='TestProjectFail'",
    query2: "SELECT * FROM DBO.account WHERE account_name = 'TestAccount1344'",
    deleteExisting: "delete from dbo.account where account_name = 'TestAccount1344'",
    queryProject: "SELECT * FROM FIRM_POC.dbo.account_projects WHERE name='Demo5555'",
    deleteProject: "delete from FIRM_POC.dbo.account_projects WHERE name='Demo5555'",
    etlSourceTransformation:"SELECT e.[EmpCode],e.name, ( CASE LEN(REPLACE(LTRIM(RTRIM(REPLACE(e.name,'.',''))),' ','')) WHEN LEN(LTRIM(RTRIM(REPLACE(e.name,'.','')))) - 1 THEN PARSENAME(REPLACE(LTRIM(RTRIM(REPLACE(e.name,'.',''))),' ','.'), 2) ELSE PARSENAME(REPLACE(LTRIM(RTRIM(REPLACE(e.name,'.',''))),' ','.'), 3) END ) AS FirstName, ISNULL((CASE LEN(REPLACE(LTRIM(RTRIM(REPLACE(e.name,'.',''))),' ','')) WHEN LEN(LTRIM(RTRIM(REPLACE(e.name,'.','')))) - 1 THEN NULL ELSE PARSENAME(REPLACE(LTRIM(RTRIM(REPLACE(e.name,'.',''))),' ','.'), 2) END ),'') AS MiddleName, PARSENAME(REPLACE(LTRIM(RTRIM(REPLACE(e.name,'.',''))),' ','.'), 1) AS LastName FROM stg_employee e Where [EmpCode] = 'FS224'",
    etlTarget: "select employee_code, employee_name, employee_first_name, employee_middle_name, employee_last_name from employee_details where employee_code = 'FS224'",
    strproc:"exec sp_load_qc_check",
    etlRegression: "select * from ETL_REGRESSION_TEST_CASE_LOGS order by EXECUTION_DATE desc",
    rowCountInDB:"Select Count(*) CNT From dbo.stg_employee_education",
    columnQuery:"select TABLE_NAME, COLUMN_NAME from INFORMATION_SCHEMA.COLUMNS where (TABLE_SCHEMA + '.' + TABLE_NAME) = 'dbo.stg_employee_education' order by COLUMN_NAME",
    jsonCountquery:"Select Count(*) CNT From dbo.stg_employeeJSON"
}

module.exports = queriesList