import { defineConfig } from 'vitepress';
import pkg from '../package.json' with { type: 'json' };

type NavLabels = {
  tutorial: string;
  howto: string;
  explanation: string;
  reference: string;
  integrations: string;
};

type SidebarLabels = {
  tutorialGroup: string;
  gettingStarted: string;
  blankSlate: string;
  howtoGroup: string;
  installNene2: string;
  installPython: string;
  liveSmoke: string;
  openapiCodegen: string;
  explGroup: string;
  scope: string;
  problemDetails: string;
  nene2Boundary: string;
  refGroup: string;
  clientApi: string;
  configuration: string;
  errors: string;
  intGroup: string;
  ecosystem: string;
};

function nav(t: NavLabels, p: string = '') {
  return [
    { text: t.tutorial, link: `${p}/tutorial/getting-started`, activeMatch: `${p}/tutorial/` },
    { text: t.howto, link: `${p}/howto/live-smoke`, activeMatch: `${p}/howto/` },
    {
      text: t.explanation,
      link: `${p}/explanation/scope`,
      activeMatch: `${p}/explanation/`,
    },
    { text: t.reference, link: `${p}/reference/client-api`, activeMatch: `${p}/reference/` },
    {
      text: t.integrations,
      link: `${p}/integrations/ecosystem`,
      activeMatch: `${p}/integrations/`,
    },
    {
      text: `v${pkg.version}`,
      items: [
        {
          text: 'npm',
          link: 'https://www.npmjs.com/package/@hideyukimori/nene2-client',
        },
        {
          text: 'Changelog',
          link: 'https://github.com/hideyukiMORI/nene2-js/blob/main/CHANGELOG.md',
        },
        {
          text: 'Releases',
          link: 'https://github.com/hideyukiMORI/nene2-js/releases',
        },
        { text: 'NENE2 (PHP)', link: 'https://hideyukimori.github.io/NENE2/' },
      ],
    },
  ];
}

function sidebar(t: SidebarLabels, p: string = '') {
  return {
    [`${p}/tutorial/`]: [
      {
        text: t.tutorialGroup,
        items: [
          { text: t.gettingStarted, link: `${p}/tutorial/getting-started` },
          { text: t.blankSlate, link: `${p}/tutorial/blank-slate-journey` },
        ],
      },
    ],
    [`${p}/howto/`]: [
      {
        text: t.howtoGroup,
        items: [
          { text: t.installNene2, link: `${p}/howto/install-nene2` },
          { text: t.installPython, link: `${p}/howto/install-nene2-python` },
          { text: t.liveSmoke, link: `${p}/howto/live-smoke` },
          { text: t.openapiCodegen, link: `${p}/howto/openapi-codegen` },
        ],
      },
    ],
    [`${p}/explanation/`]: [
      {
        text: t.explGroup,
        items: [
          { text: t.scope, link: `${p}/explanation/scope` },
          { text: t.problemDetails, link: `${p}/explanation/problem-details` },
          { text: t.nene2Boundary, link: `${p}/explanation/nene2-boundary` },
        ],
      },
    ],
    [`${p}/reference/`]: [
      {
        text: t.refGroup,
        items: [
          { text: t.clientApi, link: `${p}/reference/client-api` },
          { text: t.configuration, link: `${p}/reference/configuration` },
          { text: t.errors, link: `${p}/reference/errors` },
        ],
      },
    ],
    [`${p}/integrations/`]: [
      {
        text: t.intGroup,
        items: [{ text: t.ecosystem, link: `${p}/integrations/ecosystem` }],
      },
    ],
  };
}

const enNav: NavLabels = {
  tutorial: 'Tutorial',
  howto: 'HOWTO',
  explanation: 'Explanation',
  reference: 'Reference',
  integrations: 'Integrations',
};

const enSide: SidebarLabels = {
  tutorialGroup: 'Tutorial',
  gettingStarted: 'Getting started',
  blankSlate: 'Blank-slate journey',
  howtoGroup: 'HOWTO',
  installNene2: 'Install NENE2 (PHP)',
  installPython: 'Install nene2-python',
  liveSmoke: 'Live smoke against NENE2',
  openapiCodegen: 'OpenAPI sync & codegen',
  explGroup: 'Explanation',
  scope: 'Scope & mission',
  problemDetails: 'Problem Details (RFC 9457)',
  nene2Boundary: 'Relationship to NENE2',
  refGroup: 'Reference',
  clientApi: 'createNene2Client API',
  configuration: 'Configuration',
  errors: 'Errors & validation helpers',
  intGroup: 'Integrations',
  ecosystem: 'Ecosystem map',
};

const jaNav: NavLabels = {
  tutorial: 'チュートリアル',
  howto: 'HOWTO',
  explanation: '解説',
  reference: 'リファレンス',
  integrations: '連携',
};

const jaSide: SidebarLabels = {
  tutorialGroup: 'チュートリアル',
  gettingStarted: 'はじめに',
  blankSlate: '知識ゼロの全体像',
  howtoGroup: 'HOWTO',
  installNene2: 'NENE2 (PHP) の起動',
  installPython: 'nene2-python の起動',
  liveSmoke: 'NENE2 への live smoke',
  openapiCodegen: 'OpenAPI 同期と codegen',
  explGroup: '解説',
  scope: 'スコープとミッション',
  problemDetails: 'Problem Details (RFC 9457)',
  nene2Boundary: 'NENE2 との関係',
  refGroup: 'リファレンス',
  clientApi: 'createNene2Client API',
  configuration: '設定',
  errors: 'エラーとバリデーション',
  intGroup: '連携',
  ecosystem: 'エコシステム',
};

const frNav: NavLabels = {
  tutorial: 'Tutoriel',
  howto: 'Guides',
  explanation: 'Explication',
  reference: 'Référence',
  integrations: 'Intégrations',
};

const frSide: SidebarLabels = {
  tutorialGroup: 'Tutoriel',
  gettingStarted: 'Premiers pas',
  blankSlate: 'Parcours débutant',
  howtoGroup: 'Guides pratiques',
  installNene2: 'Installer NENE2',
  installPython: 'Installer nene2-python',
  liveSmoke: 'Smoke test en direct',
  openapiCodegen: 'Sync OpenAPI & codegen',
  explGroup: 'Explication',
  scope: 'Périmètre',
  problemDetails: 'Problem Details (RFC 9457)',
  nene2Boundary: 'Lien avec NENE2',
  refGroup: 'Référence',
  clientApi: 'API createNene2Client',
  configuration: 'Configuration',
  errors: 'Erreurs & validation',
  intGroup: 'Intégrations',
  ecosystem: 'Écosystème',
};

const zhNav: NavLabels = {
  tutorial: '教程',
  howto: '操作指南',
  explanation: '说明',
  reference: '参考',
  integrations: '集成',
};

const zhSide: SidebarLabels = {
  tutorialGroup: '教程',
  gettingStarted: '入门',
  blankSlate: '零基础路径',
  howtoGroup: '操作指南',
  installNene2: '安装 NENE2',
  installPython: '安装 nene2-python',
  liveSmoke: 'NENE2 实时冒烟',
  openapiCodegen: 'OpenAPI 同步与 codegen',
  explGroup: '说明',
  scope: '范围与使命',
  problemDetails: 'Problem Details (RFC 9457)',
  nene2Boundary: '与 NENE2 的关系',
  refGroup: '参考',
  clientApi: 'createNene2Client API',
  configuration: '配置',
  errors: '错误与校验',
  intGroup: '集成',
  ecosystem: '生态地图',
};

const ptNav: NavLabels = {
  tutorial: 'Tutorial',
  howto: 'Guias',
  explanation: 'Explicação',
  reference: 'Referência',
  integrations: 'Integrações',
};

const ptSide: SidebarLabels = {
  tutorialGroup: 'Tutorial',
  gettingStarted: 'Primeiros passos',
  blankSlate: 'Jornada do zero',
  howtoGroup: 'Guias práticos',
  installNene2: 'Instalar NENE2',
  installPython: 'Instalar nene2-python',
  liveSmoke: 'Smoke test ao vivo',
  openapiCodegen: 'Sync OpenAPI & codegen',
  explGroup: 'Explicação',
  scope: 'Escopo',
  problemDetails: 'Problem Details (RFC 9457)',
  nene2Boundary: 'Relação com NENE2',
  refGroup: 'Referência',
  clientApi: 'API createNene2Client',
  configuration: 'Configuração',
  errors: 'Erros & validação',
  intGroup: 'Integrações',
  ecosystem: 'Ecossistema',
};

const deNav: NavLabels = {
  tutorial: 'Tutorial',
  howto: 'Anleitungen',
  explanation: 'Erklärung',
  reference: 'Referenz',
  integrations: 'Integrationen',
};

const deSide: SidebarLabels = {
  tutorialGroup: 'Tutorial',
  gettingStarted: 'Erste Schritte',
  blankSlate: 'Einstieg ohne Vorwissen',
  howtoGroup: 'Anleitungen',
  installNene2: 'NENE2 installieren',
  installPython: 'nene2-python installieren',
  liveSmoke: 'Live-Smoke gegen NENE2',
  openapiCodegen: 'OpenAPI-Sync & Codegen',
  explGroup: 'Erklärung',
  scope: 'Umfang',
  problemDetails: 'Problem Details (RFC 9457)',
  nene2Boundary: 'Bezug zu NENE2',
  refGroup: 'Referenz',
  clientApi: 'createNene2Client API',
  configuration: 'Konfiguration',
  errors: 'Fehler & Validierung',
  intGroup: 'Integrationen',
  ecosystem: 'Ökosystem',
};

const editPattern = 'https://github.com/hideyukiMORI/nene2-js/edit/main/docs-site/:path';

export default defineConfig({
  title: 'nene2-js',
  description:
    'TypeScript client for NENE2 JSON APIs — OpenAPI-aligned types, fetch helpers, RFC 9457 Problem Details.',
  base: process.env.GITHUB_ACTIONS ? '/nene2-js/' : '/',
  srcDir: './docs-site',
  outDir: './.vitepress/dist',
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [
    ['meta', { name: 'theme-color', content: '#3178c6' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: nav(enNav),
        sidebar: sidebar(enSide),
        editLink: { pattern: editPattern, text: 'Edit this page on GitHub' },
        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2026 hideyukiMORI',
        },
      },
    },

    ja: {
      label: '日本語',
      lang: 'ja',
      themeConfig: {
        nav: nav(jaNav, '/ja'),
        sidebar: sidebar(jaSide, '/ja'),
        editLink: { pattern: editPattern, text: 'GitHub でこのページを編集' },
        footer: {
          message: 'MIT ライセンスの下で公開されています。',
          copyright: 'Copyright © 2026 hideyukiMORI',
        },
        docFooter: { prev: '前のページ', next: '次のページ' },
        outlineTitle: 'このページの目次',
        returnToTopLabel: 'トップへ戻る',
        sidebarMenuLabel: 'メニュー',
        darkModeSwitchLabel: 'ダークモード',
      },
    },

    fr: {
      label: 'Français',
      lang: 'fr',
      themeConfig: {
        nav: nav(frNav, '/fr'),
        sidebar: sidebar(frSide, '/fr'),
        editLink: { pattern: editPattern, text: 'Modifier cette page sur GitHub' },
        footer: {
          message: 'Publié sous licence MIT.',
          copyright: 'Copyright © 2026 hideyukiMORI',
        },
        docFooter: { prev: 'Page précédente', next: 'Page suivante' },
        outlineTitle: 'Sur cette page',
        returnToTopLabel: 'Retour en haut',
      },
    },

    zh: {
      label: '中文',
      lang: 'zh-Hans',
      themeConfig: {
        nav: nav(zhNav, '/zh'),
        sidebar: sidebar(zhSide, '/zh'),
        editLink: { pattern: editPattern, text: '在 GitHub 上编辑此页' },
        footer: {
          message: '基于 MIT 许可证发布。',
          copyright: 'Copyright © 2026 hideyukiMORI',
        },
        docFooter: { prev: '上一页', next: '下一页' },
        outlineTitle: '本页目录',
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '深色模式',
      },
    },

    'pt-br': {
      label: 'Português (Brasil)',
      lang: 'pt-BR',
      themeConfig: {
        nav: nav(ptNav, '/pt-br'),
        sidebar: sidebar(ptSide, '/pt-br'),
        editLink: { pattern: editPattern, text: 'Editar esta página no GitHub' },
        footer: {
          message: 'Publicado sob a licença MIT.',
          copyright: 'Copyright © 2026 hideyukiMORI',
        },
        docFooter: { prev: 'Página anterior', next: 'Próxima página' },
        outlineTitle: 'Nesta página',
        returnToTopLabel: 'Voltar ao topo',
      },
    },

    de: {
      label: 'Deutsch',
      lang: 'de',
      themeConfig: {
        nav: nav(deNav, '/de'),
        sidebar: sidebar(deSide, '/de'),
        editLink: { pattern: editPattern, text: 'Diese Seite auf GitHub bearbeiten' },
        footer: {
          message: 'Veröffentlicht unter der MIT-Lizenz.',
          copyright: 'Copyright © 2026 hideyukiMORI',
        },
        docFooter: { prev: 'Vorherige Seite', next: 'Nächste Seite' },
        outlineTitle: 'Auf dieser Seite',
        returnToTopLabel: 'Nach oben',
        sidebarMenuLabel: 'Menü',
        darkModeSwitchLabel: 'Dunkelmodus',
      },
    },
  },

  themeConfig: {
    siteTitle: 'nene2-js',
    logo: '/logo.svg',
    socialLinks: [{ icon: 'github', link: 'https://github.com/hideyukiMORI/nene2-js' }],
    search: { provider: 'local' },
    outline: { level: [2, 3] },
  },

  markdown: {
    theme: { light: 'github-light', dark: 'one-dark-pro' },
    lineNumbers: true,
  },
});
