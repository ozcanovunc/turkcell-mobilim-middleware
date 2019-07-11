const { expect } = require("chai");
const getEntities = require("../lib/getEntities");

var listOfEntities = {
    "AgentEntityCollection": {
        "AgentEntity": {
            "0": {
                "AdCode": "TCELL|TEAM-ACENTE-DOK-TUR",
                "AgentID": 201,
                "AgentName": "DOK-TUR",
                "UserGroup": "ACENTA_DOK-TUR"
            },
            "1": {
                "AdCode": "TCELL|TEAM-ACENTE-VISTA",
                "AgentID": 61,
                "AgentName": "VISTA",
                "UserGroup": "ACENTA_VISTA"
            }
        }
    }
};

var entity = {
    "AgentEntityCollection": {
        "AgentEntity": {
            "AdCode": "TCELL|TEAM-ACENTE-DOK-TUR",
            "AgentID": 201,
            "AgentName": "DOK-TUR",
            "UserGroup": "ACENTA_DOK-TUR"
        }
    }
};

it("should retrieve the correct list of entities from an object", done => {
    var entities = getEntities(listOfEntities, "AgentEntity");
    expect(entities).to.be.an("array");
    expect(entities.length).to.equal(2);
    expect(entities[0]).to.be.an("object");
    expect(entities[0]).to.have.a.property("AdCode");
    done();
});

it("should retrieve the correct entity from an object", done => {
    var entities = getEntities(entity, "AgentEntity");
    expect(entities).to.be.an("array");
    expect(entities.length).to.equal(1);
    expect(entities[0]).to.be.an("object");
    expect(entities[0]).to.have.a.property("AdCode");
    done();
});
