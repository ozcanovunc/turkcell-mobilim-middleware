const { expect } = require("chai");
const {
    soapToRest,
    restToSoap
} = require("../lib/translator");

it("should translate a soap response to rest", done => {
    let response = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
   <s:Header>
      <ActivityId CorrelationId="0ca2fe94-2ba1-41d1-8634-20fd3143c7fe" xmlns="http://schemas.microsoft.com/2004/09/ServiceModel/Diagnostics">1d49f96a-04bd-4e8a-ab78-d8b42cae7817</ActivityId>
   </s:Header>
   <s:Body>
      <CalculateOtelPriceResponse xmlns="http://tempuri.org/">
         <CalculateOtelPriceResult xmlns:a="http://schemas.datacontract.org/2004/07/NetflowServices" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
            <a:AgentEntityCollection/>
            <a:CalculatedOtelPrice>666,72TL</a:CalculatedOtelPrice>
            <a:CityCountryEntityCollection/>
            <a:CodeEntityCollection/>
            <a:ErrorCode i:nil="true"/>
            <a:ErrorMessage/>
            <a:HasError>false</a:HasError>
            <a:KonaklamaEntityCollection/>
            <a:OtelBasicEntityCollection/>
            <a:OtelEntityCollection/>
            <a:TripDetailsERP/>
            <a:TripInfo>
               <a:AffectedPoint>0</a:AffectedPoint>
               <a:MessageContent i:nil="true"/>
               <a:MessageHeader i:nil="true"/>
               <a:MessageType i:nil="true"/>
            </a:TripInfo>
         </CalculateOtelPriceResult>
      </CalculateOtelPriceResponse>
   </s:Body>
</s:Envelope>`;
    let { headers, body } = soapToRest(response);

    expect(headers).to.be.an("object");
    expect(body).to.be.an("object");
    expect(body).to.have.a.property("CalculatedOtelPrice");

    done();
});

it("should translate a rest request to soap", done => {
    let requestOptions = { body: { username: "foo" }, endpoint: "Foo" };
    let expectedResult = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
        <tem:${requestOptions.endpoint}>
            <tem:username>${requestOptions.body.username}</tem:username>
        </tem:${requestOptions.endpoint}>
        </soapenv:Body>
        </soapenv:Envelope>`;
    let actualResult = restToSoap(requestOptions);

    // Remove all whitespaces
    expectedResult = expectedResult.replace(/\s/g, "");
    actualResult = actualResult.replace(/\s/g, "");

    expect(expectedResult).to.equal(actualResult);
    done();
});
