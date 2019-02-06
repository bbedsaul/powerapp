import { Component } from '@angular/core';

import {UpdateLinesAddPage} from "../update-lines-add/update-lines-add";
import {FieldAuditAddPage} from "../field-audit-add/field-audit-add";
import {RiskAssessmentAddPage} from "../risk-assessment-add/risk-assessment-add";
import {WorkPermitAddPage} from "../work-permit-add/work-permit-add";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  wpPage = WorkPermitAddPage;
  riskPage = RiskAssessmentAddPage;
  upLinesPage = UpdateLinesAddPage
  auditPage = FieldAuditAddPage;
}
