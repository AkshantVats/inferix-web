import type { Metadata } from "next";
import Link from "next/link";
import DocsShell from "@/components/docs/DocsShell";
import {
  DocKicker,
  DocH1,
  DocIntro,
  DocSection,
  DocP,
  DocCode,
  DocUl,
  DocTable,
  DocCallout,
  DocNext,
} from "@/components/docs/DocParts";

export const metadata: Metadata = {
  title: "Finance agents — Inferix Docs",
  description:
    "Invoice reconciliation agents on Inferix: ERP match, tax exceptions, schema drift.",
};

export default function FinanceGuide() {
  return (
    <DocsShell pathname="/docs/guides/finance">
      <DocKicker>Guides</DocKicker>
      <DocH1>Finance agents</DocH1>
      <DocIntro>
        Extract invoice → match PO/ERP → draft journal entry → escalate exceptions.{" "}
        <code>agent_id: invoice</code>.
      </DocIntro>

      <DocSection title="Scenario">
        <DocP>
          An ERP field rename silently broke line matching — TraceForge showed{" "}
          <code>tax_code_lookup</code> disappearing from traces while HTTP still looked
          healthy. DriftWatch + FineForge adapter fix close the loop.
        </DocP>
      </DocSection>

      <DocSection title="What Inferix gives you">
        <DocUl
          items={[
            <>TraceForge tool taxonomy for extract → match → ledger → HITL</>,
            <>DriftWatch on tool schema drift (D03) and format drift (D16)</>,
            <>FineForge adapter + fixture updates (F03/F04)</>,
            <>LensAI cost per reconciled invoice (business success)</>,
          ]}
        />
      </DocSection>

      <DocSection title="Tools & intents">
        <DocTable
          headers={["Tools", "Intents"]}
          rows={[
            [
              "docs.extract_invoice, erp.find_po, erp.match_line, erp.get_tax_code, ledger.draft_entry, human.escalate",
              "match_po, partial_match, tax_exception, duplicate_invoice, currency_mismatch, missing_po",
            ],
          ]}
        />
      </DocSection>

      <DocSection title="Setup">
        <DocCode>{`routing:
  rules:
    - name: invoice-match
      when: { agent: invoice, intent: match_po }
      model: owned/general-llm
    - name: invoice-tax
      when: { agent: invoice, intent: tax_exception }
      model: owned/general-llm
      escalate_if: { ambiguity: true, model: provider/strong }

# tool_schema_version required on all erp.* spans
# HITL escalate tagged so exclusive wait ≠ hang (T20)`}</DocCode>
      </DocSection>

      <DocSection title="Watch & failures">
        <DocUl
          items={[
            <>Tool 4xx schema errors (T03) → FineForge adapter</>,
            <>Skipped erp.get_tax_code on tax_exception</>,
            <>Parse fail rate on extract (D16)</>,
            <>Poison retrieval of PO docs (D05)</>,
          ]}
        />
        <DocCallout title="Related">
          <DocP>
            Schema remediation at scale is the{" "}
            <Link href="/docs/guides/api-healing">API healing</Link> wedge; finance agents
            are the ERP-shaped proof of the same TraceForge + FineForge pattern.
          </DocP>
        </DocCallout>
      </DocSection>

      <DocNext
        href="/docs/guides/gtm-outbound"
        label="GTM & outbound →"
        hint="Cost routing and cache for sales agents."
      />
    </DocsShell>
  );
}
