/**
 * FT130–FT229: docs-driven onboarding (blank slate, NENE2 ↔ python, ja docs site).
 * @returns {Array<{ handler: string, category: string, theme: string, mode: 'fixture'|'live', personaA: string, personaB: string }>}
 */

const PERSONAS = [
  {
    id: 'ts_app',
    a: 'TypeScript アプリ開発者（知識ゼロ）',
    b: 'hideyukimori.github.io/nene2-js/ja を初めて読む',
  },
  {
    id: 'py_dev',
    a: 'Python 開発者（nene2-python のみ知っている）',
    b: 'PHP NENE2 は未経験、parity で JS クライアントを試す',
  },
  {
    id: 'php_dev',
    a: 'NENE2 PHP 開発者（Composer 慣れ）',
    b: 'フロント/スクリプトから TS クライアントを足す',
  },
  {
    id: 'devops',
    a: 'DevOps / SRE（ヘルスとポートの切り分け）',
    b: '8080/8000/18080 の取り違えを疑う',
  },
  {
    id: 'ai_agent',
    a: 'AI エージェント（ドキュメント URL のみ入力）',
    b: 'AGENTS.md なしで ja サイトだけ渡された想定',
  },
  {
    id: 'founder',
    a: 'スタートアップ創業者（時間がない）',
    b: '最短で smoke が通る経路だけ欲しい',
  },
];

const STACKS = [
  { id: 'nene2_first', label: 'NENE2(PHP)起動→ja docs→npm client' },
  { id: 'python_first', label: 'nene2-python起動→NENE2確認→npm client' },
  { id: 'alt_ports', label: 'evac :18080 / python :8000 の切替' },
  { id: 'client_only', label: 'サーバ未起動で client のみ導入' },
];

const DOC_CHECKS = [
  'getting_started_npm',
  'getting_started_smoke_code',
  'getting_started_curl_health',
  'getting_started_auth_env',
  'live_smoke_env',
  'openapi_sync_cmds',
  'scope_not_server',
  'problem_details_import',
  'nene2_boundary_openapi',
  'ecosystem_nene2_link',
  'ecosystem_python_link',
  'config_secrets_warning',
  'client_api_methods',
  'errors_validation_helpers',
  'install_nene2_page',
  'install_python_page',
  'blank_slate_journey',
  'sibling_layout_hint',
  'multi_backend_env',
  'degraded_health_doc',
];

const CLIENT_SCENARIOS = [
  'smoke_fixture',
  'health_wrong_service',
  'notes_list_fixture',
  'protected_401_fixture',
  'validation_422_fixture',
  'html_wrong_port_hint',
  'baseurl_trailing_slash',
  'abort_signal',
  'machine_health_401',
  'create_note_fixture',
];

/** @type {ReturnType<typeof build> extends infer T ? T : never} */
export function buildDocsOnboardingTemplates() {
  /** @type {Array<{ handler: string, category: string, theme: string, mode: 'fixture'|'live', personaA: string, personaB: string }>} */
  const t = [];

  let i = 0;
  for (const persona of PERSONAS) {
    for (const stack of STACKS) {
      for (const doc of DOC_CHECKS.slice(0, 4)) {
        if (t.length >= 72) break;
        t.push({
          handler: `onb_doc_${persona.id}_${stack.id}_${doc}`,
          category: 'docs-ja-onboarding',
          theme: `[${persona.id}/${stack.id}] ja doc: ${doc}`,
          mode: 'fixture',
          personaA: persona.a,
          personaB: `${persona.b} / ${stack.label}`,
        });
        i += 1;
      }
    }
  }

  for (const persona of PERSONAS) {
    for (const scenario of CLIENT_SCENARIOS) {
      if (t.length >= 95) break;
      t.push({
        handler: `onb_client_${persona.id}_${scenario}`,
        category: 'docs-client-onboarding',
        theme: `[${persona.id}] client: ${scenario}`,
        mode: 'fixture',
        personaA: persona.a,
        personaB: 'ja チュートリアルのコードをそのまま実行',
      });
    }
  }

  const liveHandlers = [
    'live_smoke_after_nene2',
    'live_smoke_after_python',
    'live_matrix_skip_unset',
    'live_protected_journey',
    'live_notes_journey',
  ];
  for (const [idx, h] of liveHandlers.entries()) {
    t.push({
      handler: `onb_${h}`,
      category: 'docs-live-onboarding',
      theme: `live onboarding ${idx + 1}`,
      mode: 'live',
      personaA: 'サーバ起動後に ja howto/live-smoke を実行',
      personaB: PERSONAS[idx % PERSONAS.length].b,
    });
  }

  while (t.length < 100) {
    const n = t.length;
    t.push({
      handler: `onb_misc_fill_${n}`,
      category: 'docs-misc-onboarding',
      theme: `onboarding fill ${n}`,
      mode: 'fixture',
      personaA: PERSONAS[n % PERSONAS.length].a,
      personaB: '余剰シナリオ（ドキュメント再読）',
    });
  }

  return t.slice(0, 100);
}
