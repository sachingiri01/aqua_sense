from pine import retriever
from upload import upload_text_to_pinecone
from pine import vectorstore   # ✅ we will upsert via vectorstore


policies =[
  {
    "doc_id": "policy_1",
    "source": "manual",
    "doc_type": "data_integrity_policy",
    "raw_text": "Water Quality Data Usage & Integrity Policy: All real-time and historical water quality data must be collected, stored, and processed with scientific accuracy and transparency. Sensor readings must not be altered, fabricated, or misrepresented. Any anomaly in data collection must be automatically flagged and investigated. Data is strictly to be used for monitoring, prediction, and decision-making within the water reuse system. Unauthorized distribution, manipulation of datasets, or artificial boosting of model performance is not permitted."
  },
  {
    "doc_id": "policy_2",
    "source": "manual",
    "doc_type": "iot_security_policy",
    "raw_text": "IoT Device Security & Deployment Policy: All sensor devices must be securely deployed and protected against tampering, unauthorized access, and configuration changes. Communication channels must be authenticated and, where possible, encrypted. Device IDs, calibration data, and firmware must remain secure. Any physical damage, tampering attempt, or abnormal device activity must be logged immediately. Unauthorized relocation or replacement of sensors is prohibited."
  },
  {
    "doc_id": "policy_3",
    "source": "manual",
    "doc_type": "ml_ethics_policy",
    "raw_text": "Machine Learning Ethics & Transparency Policy: ML predictions regarding water reuse categories must remain accurate, unbiased, and explainable. Training datasets must be validated and documented. Model decisions must be transparent to operators and include justification or confidence levels. Automated outputs should not override human judgment unless explicitly configured. Updating ML models requires documentation of new parameters, accuracy benchmarks, and version control."
  },
  {
    "doc_id": "policy_4",
    "source": "manual",
    "doc_type": "environmental_policy",
    "raw_text": "Environmental Compliance & Regulatory Policy: All outputs, recommendations, and manually triggered actions must comply with regulatory norms regarding water reuse, discharge standards, and environmental safety. The system must not generate recommendations that violate environmental guidelines. Any detection of unsafe water levels must result in immediate alerts. System decisions must align with pollution control, water treatment, and sustainability regulations."
  },
  {
    "doc_id": "policy_5",
    "source": "manual",
    "doc_type": "access_control_policy",
    "raw_text": "User Access & Operational Control Policy: Access to the dashboard, ML tools, or agent modules must be role-based and restricted to authorized users only. Credential sharing is prohibited. All critical actions such as threshold changes, model retraining, or device calibration require elevated permissions. Audit logs must track every user action, including login attempts and configuration changes."
  },
  {
    "doc_id": "policy_6",
    "source": "manual",
    "doc_type": "agent_safety_policy",
    "raw_text": "AI Agent Recommendation Safety Policy: Autonomous agents may assist in generating alerts, routing suggestions, or insights, but must operate within predefined safety boundaries. Agents must avoid generating harmful, misleading, or unsafe instructions. For low-confidence predictions, the system must default to requesting human verification. All agent-generated recommendations must be logged for review and traceability."
  },
  {
    "doc_id": "policy_7",
    "source": "manual",
    "doc_type": "audit_policy",
    "raw_text": "Transparency & Auditability Policy: Every prediction, alert, decision, or user action must be recorded in immutable audit logs. Logs must include timestamps, source devices, system actions, and user identities. No log entry may be deleted or modified without authorized approval. Audit records support compliance inspections, debugging, and environmental reporting."
  },
  {
    "doc_id": "policy_8",
    "source": "manual",
    "doc_type": "alert_response_policy",
    "raw_text": "Safety Alert & Incident Response Policy: When water quality parameters exceed defined thresholds, the system must generate alerts categorized as warning or critical. Operators must acknowledge alerts and take appropriate corrective actions. Failure to respond to critical alerts triggers automatic escalation. Alert systems must remain active at all times and may not be disabled without authorization."
  },
  {
    "doc_id": "policy_9",
    "source": "manual",
    "doc_type": "data_ethics_policy",
    "raw_text": "Ethical Use of External Datasets Policy: All datasets used for training, benchmarking, or validating ML models must comply with licensing and ethical requirements. Unauthorized datasets must not be used. Industrial or private datasets must be anonymized. Data must not be disclosed outside approved environments. Any external dataset must undergo verification before integration into the ML pipeline."
  },
  {
    "doc_id": "policy_10",
    "source": "manual",
    "doc_type": "user_conduct_policy",
    "raw_text": "Platform Conduct & Professional Interaction Policy: All users interacting with the system must maintain professionalism. Abusive, careless, or harmful interactions with dashboards, settings, or AI assistants are prohibited. Users must follow operational procedures, avoid misuse of tools, and maintain respectful communication. Intentional system misuse, disruptive behavior, or unsafe interactions may result in access restrictions."
  }
]


# def rag_upload():
#     uploaded, failed = 0, 0
#     errors = []

#     for policy in policies:
#         try:
#             result = upload_text_to_pinecone(
#                 raw_text=policy["raw_text"],
#                 doc_id=policy["doc_id"],
#                 source=policy["source"],
#                 doc_type=policy["doc_type"]
#             )
#             if result.get("status") == "success":
#                 uploaded += 1
#             else:
#                 failed += 1
#                 errors.append(result.get("msg", "Unknown error"))
#         except Exception as e:
#             failed += 1
#             errors.append(str(e))

#     return {
#         "result":result,
#         "success": failed == 0,
#         "uploaded": uploaded,
#         "failed": failed,
#         "errors": errors
#     }



def rag_upload():
    uploaded, failed = 0, 0
    errors = []

    for policy in policies:
        try:
            result = upload_text_to_pinecone(
                raw_text=policy["raw_text"],
                doc_id=policy["doc_id"],
                source=policy["source"],
                doc_type=policy["doc_type"]
            )

            if result["status"] == "success":
                uploaded += 1
            else:
                failed += 1
                errors.append(result["msg"])

        except Exception as e:
            failed += 1
            errors.append(str(e))

    return {
        "success": failed == 0,
        "uploaded": uploaded,
        "failed": failed,
        "errors": errors
    }
