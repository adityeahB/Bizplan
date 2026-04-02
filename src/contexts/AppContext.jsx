import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const STORAGE_KEY = 'business_plan_answers';
const SECTIONS = [
  { id: 'personal', titleKey: 'personal_info' },
  { id: 'foundational', titleKey: 'section_foundational' },
  { id: 'market', titleKey: 'section_market' },
  { id: 'financial', titleKey: 'section_financial' },
  { id: 'strategic', titleKey: 'section_strategic' },
  { id: 'implementation', titleKey: 'section_implementation' },
  { id: 'checklist', titleKey: 'section_checklist' },
];

// All 63 answers initialized
const INITIAL_ANSWERS = {
  // Personal
  name: '', bankName: '', date: new Date().toISOString().split('T')[0],
  // Foundational (1.1 to 1.3)
  exec_summary_purpose: '', exec_summary_elements: [], exec_summary_text: '',
  mission_vision_distinction: '', vision_characteristic: '', mission_statement: '', vision_statement: '', core_values: '',
  objectives_false: '', financial_objective: '', customer_objective: '', internal_objective: '', learning_objective: '',
  // Market (2.1 to 2.5)
  pestel_factors: [], pestel_political: '', pestel_economic: '', pestel_social: '', pestel_technological: '', pestel_environmental: '',
  legislation: '',
  porter_horizontal: [], supplier_power: '', customer_power: '', new_entrants: '', substitutes: '', rivalry: '', average_intensity: '',
  swot_quadrants: '', swot_bets: '', swot_warnings: '', swot_restrictions: '', swot_risks: '',
  bmc_not_area: '', bmc_segments: '', bmc_value: '', bmc_channels: '', bmc_relationships: '', bmc_revenue: '', bmc_resources: '', bmc_activities: '', bmc_partnerships: '', bmc_costs: '',
  marketing_mix_elements: '', product_desc: '', price_desc: '', place_desc: '', promotion_desc: '', people_desc: '', process_desc: '', physical_evidence_desc: '',
  // Financial (3.1 to 3.12)
  assumptions: [], irc_rate: '', municipal_surcharge: '', vat_services: '', vat_expenses: '', inflation: '', customer_payment_days: '', supplier_payment_days: '', short_rate: '', long_rate: '', risk_free: '', market_risk_premium: '',
  revenue_approach: '', revenue_table: '', utilization_rates: '',
  expense_categories: [], fixed_variable_table: '', personnel_table: '', personnel_meal: '', personnel_insurance: '', personnel_welfare: '',
  investment_categories: '', investment_budget: '',
  wacc_formula: '', cost_equity_rf: '', cost_equity_premium: '', cost_equity_betaU: '', cost_equity_de: '', cost_equity_tax: '', cost_equity_betaL: '', cost_equity_ke: '',
  pretax_debt: '', aftertax_kd: '', wacc_debt_weight: '', wacc_equity_weight: '', wacc_final: '',
  negative_wc_meaning: '', wc_needs: '', wc_resources: '', wc_requirement: '', wc_investment: '',
  ebitda_formula: '', income_statement: '',
  fcff_formula: '', cashflow_table: '',
  breakeven_meaning: '', fixed_costs: '', variable_costs: '', total_revenue_break: '', variable_cost_ratio: '', contribution_margin: '', breakeven_revenue: '',
  ratio_matches: '', ratios_table: '',
  npv_true: '', npv_table: '', terminal_growth: '', npv_result: '', npv_decision: '',
  irr_result: '', irr_decision: '',
  payback_table: '', payback_period: '',
  risk_sensitivity_vars: '', base_case: '', optimistic: '', pessimistic: '', pessimistic_viable: '',
  accounting_equation: '', balance_sheet: '',
  // Strategic (4.1)
  bsc_perspectives: '', bsc_table: '',
  // Implementation (5.1, 5.2)
  activity_plan: '', critical_factors: '',
  // Final (6)
  checklist_items: [], final_risk: ''
};

export const AppProvider = ({ children }) => {
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_ANSWERS;
  });
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState(() => {
    const saved = localStorage.getItem('completed_sections');
    return saved ? JSON.parse(saved) : [false, false, false, false, false, false, false];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('completed_sections', JSON.stringify(completedSections));
  }, [completedSections]);

  const updateAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const markSectionComplete = (index, isComplete) => {
    setCompletedSections(prev => prev.map((v, i) => i === index ? isComplete : v));
  };

  const allSectionsCompleted = () => completedSections.every(v => v === true);

  return (
    <AppContext.Provider value={{
      answers, updateAnswer, currentSection, setCurrentSection,
      completedSections, markSectionComplete, allSectionsCompleted, sections: SECTIONS
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
