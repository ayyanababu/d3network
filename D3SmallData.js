function D312SimpleExtraNode(){
    return {
        "nodes": [
          {
            "id": "1",
            "name": "IndividualGDPRState__dlm"
          },
          {
            "id": "2",
            "name": "ContactPointEmail__dlm"
          },
          {
            "id": "3",
            "name": "Individual__dlm"
          },
          {
            "id": "4",
            "name": "ContactPointEmailIdentityLink__dlm"
          },
          {
            "id": "5",
            "name": "ContactPointPhone__dlm"
          },
          {
            "id": "6",
            "name": "test_results__dlm"
          },
          {
            "id": "7",
            "name": "IndividualIdentityLink__dlm"
          },
          {
            "id": "8",
            "name": "visits__dlm"
          },
          {
            "id": "9",
            "name": "UnifiedContactPointEmail__dlm"
          },
          {
            "id": "10",
            "name": "UnifiedIndividual__dlm"
          },
          {
            "id": "11",
            "name": "UnifiedContactPointPhone__dlm"
          },
          {
            "id": "12",
            "name": "ContactPointPhoneIdentityLink__dlm"
          }
        ],
        "links": [
          {
            "source": "2",
            "target": "4",
            "label": "OneToOne"
          },
          {
            "source": "4",
            "target": "2",
            "label": "OneToOne"
          },
          {
            "source": "2",
            "target": "3",
            "label": "ManyToOne"
          },
          {
            "source": "3",
            "target": "2",
            "label": "OneToMany"
          },
          {
            "source": "5",
            "target": "3",
            "label": "ManyToOne"
          },
          {
            "source": "3",
            "target": "5",
            "label": "OneToMany"
          },
          {
            "source": "8",
            "target": "3",
            "label": "OneToOne"
          },
          {
            "source": "3",
            "target": "8",
            "label": "OneToOne"
          },
          {
            "source": "6",
            "target": "8",
            "label": "OneToOne"
          },
          {
            "source": "8",
            "target": "6",
            "label": "OneToOne"
          },
          {
            "source": "5",
            "target": "12",
            "label": "OneToOne"
          },
          {
            "source": "12",
            "target": "5",
            "label": "OneToOne"
          },
          {
            "source": "9",
            "target": "10",
            "label": "ManyToOne"
          },
          {
            "source": "10",
            "target": "9",
            "label": "OneToMany"
          },
          {
            "source": "7",
            "target": "10",
            "label": "ManyToOne"
          },
          {
            "source": "10",
            "target": "7",
            "label": "OneToMany"
          },
          {
            "source": "12",
            "target": "11",
            "label": "ManyToOne"
          },
          {
            "source": "11",
            "target": "12",
            "label": "OneToMany"
          },
          {
            "source": "11",
            "target": "10",
            "label": "ManyToOne"
          },
          {
            "source": "10",
            "target": "11",
            "label": "OneToMany"
          },
          {
            "source": "4",
            "target": "9",
            "label": "ManyToOne"
          },
          {
            "source": "9",
            "target": "4",
            "label": "OneToMany"
          },
          {
            "source": "3",
            "target": "7",
            "label": "OneToOne"
          },
          {
            "source": "7",
            "target": "3",
            "label": "OneToOne"
          },
          {
            "source": "8",
            "target": "10",
            "label": "OneToMany"
          },
          {
            "source": "10",
            "target": "8",
            "label": "ManyToOne"
          }
        ]
      }
}

export default D312SimpleExtraNode;