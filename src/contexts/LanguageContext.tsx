import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'

type LanguageCode = 'en' | 'no'

type Dictionary = Record<string, Record<LanguageCode, string>>

const DICT: Dictionary = {
  'menu.portfolio': { en: 'Portfolio', no: 'Portefølje' },
  'menu.wallets': { en: 'Wallets', no: 'Lommebøker' },
  'menu.transactions': { en: 'Transactions', no: 'Transaksjoner' },
  'menu.spam': { en: 'Spam', no: 'Søppel' },
  'menu.taxes': { en: 'Taxes', no: 'Skatt' },
  'menu.health': { en: 'Account Health', no: 'Kontohelse' },
  'menu.taxLossHarvesting': { en: 'Tax Loss Harvesting', no: 'Skattetapsrealisering' },
  'menu.performance': { en: 'Performance', no: 'Avkastning' },
  'menu.prices': { en: 'Prices', no: 'Priser' },
  'menu.settings': { en: 'Settings', no: 'Innstillinger' },

  'dashboard.totalValue': { en: 'Total Value', no: 'Total verdi' },
  'dashboard.assets': { en: 'Assets', no: 'Eiendeler' },
  'dashboard.wallets': { en: 'Wallets', no: 'Lommebøker' },
  'dashboard.transactions': { en: 'Transactions', no: 'Transaksjoner' },
  'dashboard.portfolioValue': { en: 'Portfolio Value', no: 'Porteføljeverdi' },
  'dashboard.portfolioPerformance': { en: 'Portfolio Performance', no: 'Porteføljeytelse' },
  'dashboard.assetDistribution': { en: 'Asset Distribution', no: 'Aktivafordeling' },
  'dashboard.portfolioOverview': { en: 'Portfolio Overview', no: 'Porteføljeoversikt' },
  'dashboard.swapView': { en: 'Swap View', no: 'Bytt visning' },
  'dashboard.loadingAssets': { en: 'Loading assets...', no: 'Laster eiendeler...' },
  'dashboard.connected': { en: 'connected', no: 'tilkoblet' },
  'dashboard.total': { en: 'total', no: 'totalt' },
  'dashboard.unrealizedReturn': { en: 'Unrealized Return', no: 'Urealisert avkastning' },
  'dashboard.costBasis': { en: 'Cost Basis', no: 'Kostpris' },

  // Header
  'header.learn': { en: 'Learn', no: 'Lær' },
  'header.integrations': { en: 'Integrations', no: 'Integrasjoner' },
  'header.products': { en: 'Products', no: 'Produkter' },
  'header.resources': { en: 'Resources', no: 'Ressurser' },
  'header.taxGuide': { en: 'Tax Guide', no: 'Skatteguide' },
  'header.glossary': { en: 'Crypto Glossary', no: 'Krypto-ordliste' },
  'header.blog': { en: 'Blog', no: 'Blogg' },
  'header.support': { en: 'Support', no: 'Brukerstøtte' },
  'header.pricing': { en: 'Pricing', no: 'Priser' },
  'header.login': { en: 'Log in', no: 'Logg inn' },
  'header.signup': { en: 'Sign up', no: 'Registrer deg' },

  // Footer
  'footer.product': { en: 'Product', no: 'Produkt' },
  'footer.resources': { en: 'Resources', no: 'Ressurser' },
  'footer.company': { en: 'Company', no: 'Selskap' },
  'footer.legal': { en: 'Legal', no: 'Juridisk' },
  'footer.tagline': { en: 'Simplifying crypto tracking and taxes.', no: 'Forenkler kryptosporing og skatt.' },
  'footer.rights': { en: 'All rights reserved.', no: 'Alle rettigheter forbeholdt.' },
  // Footer links (labels may be reused elsewhere too)
  'footer.link.integrations': { en: 'Integrations', no: 'Integrasjoner' },
  'footer.link.taxCalculator': { en: 'Crypto Tax Calculator', no: 'Krypto skatte-kalkulator' },
  'footer.link.tracker': { en: 'Crypto Portfolio Tracker', no: 'Krypto porteføljetracker' },
  'footer.link.profit': { en: 'Crypto Profit Calculator', no: 'Krypto fortjenestekalkulator' },
  'footer.link.accountants': { en: 'For Accountants', no: 'For regnskapsførere' },
  'footer.link.businesses': { en: 'For Businesses', no: 'For bedrifter' },
  'footer.link.pricing': { en: 'Pricing', no: 'Priser' },
  'footer.link.support': { en: 'Help & Support', no: 'Hjelp og støtte' },
  'footer.link.taxAccountants': { en: 'Crypto Tax Accountants', no: 'Krypto skatterådgivere' },
  'footer.link.taxGuide': { en: 'Crypto Tax Guide', no: 'Krypto skatteguide' },
  'footer.link.glossary': { en: 'Crypto Glossary', no: 'Krypto-ordliste' },
  'footer.link.discuss': { en: 'Discuss', no: 'Diskusjon' },
  'footer.link.feedback': { en: 'Feedback', no: 'Tilbakemelding' },
  'footer.link.compare': { en: 'Compare', no: 'Sammenlign' },
  'footer.link.blog': { en: 'Blog', no: 'Blogg' },
  'footer.link.about': { en: 'About', no: 'Om oss' },
  'footer.link.partners': { en: 'Partners', no: 'Partnere' },
  'footer.link.affiliates': { en: 'Affiliates', no: 'Affiliates' },
  'footer.link.media': { en: 'Media', no: 'Media' },
  'footer.link.contact': { en: 'Contact Us', no: 'Kontakt oss' },
  'footer.link.privacy': { en: 'Privacy policy', no: 'Personvernerklæring' },
  'footer.link.terms': { en: 'Terms of Service', no: 'Vilkår for bruk' },
  'footer.link.disclaimer': { en: 'Disclaimer', no: 'Ansvarsfraskrivelse' },
  'footer.link.security': { en: 'Security', no: 'Sikkerhet' },
  'footer.link.cookies': { en: 'Cookie Preferences', no: 'Informasjonskapsler' },

  // FAQ
  'faq.title': { en: 'Frequently Asked Questions', no: 'Ofte stilte spørsmål' },
  'faq.subtitle': { en: 'Get answers to common questions about crypto taxes and reporting requirements.', no: 'Få svar på vanlige spørsmål om kryptoskatt og rapporteringskrav.' },
  'faq.q1': { en: 'Do you have to pay taxes on crypto gains?', no: 'Må du betale skatt på kryptogevinster?' },
  'faq.a1': { en: 'Yes, many jurisdictions tax crypto as property. Sales, trades, or purchases can trigger capital gains taxes, with short-term often taxed as income and long-term at lower rates.', no: 'Ja, i mange jurisdiksjoner behandles krypto som formuesobjekt. Salg, bytte eller kjøp kan utløse kapitalgevinstskatt, der kortsiktige gevinster ofte beskattes som inntekt og langsiktige gevinster med lavere satser.' },
  'faq.q2': { en: 'How do you report crypto on taxes?', no: 'Hvordan rapporterer du krypto på skatten?' },
  'faq.a2': { en: 'Track taxable events (sales/trades/earnings). Report capital gains and crypto income on the relevant forms. Keep detailed records or use software to ensure accuracy.', no: 'Før oversikt over skattepliktige hendelser (salg/bytte/inntekter). Rapporter kapitalgevinster og kryptoinntekter på relevante skjemaer. Behold detaljerte opplysninger eller bruk programvare for nøyaktighet.' },
  'faq.q3': { en: "Do you have to report crypto on taxes if you don't sell?", no: 'Må du rapportere krypto på skatten hvis du ikke selger?' },
  'faq.a3': { en: "Generally no for simple buy-and-hold. Earnings (staking, mining, airdrops) are typically taxed as income even if you don't sell.", no: 'Som regel nei for kjøp-og-hold. Inntekter (staking, mining, airdrops) beskattes vanligvis som inntekt selv om du ikke selger.' },
  'faq.q4': { en: 'When do you pay taxes on crypto?', no: 'Når betaler du skatt på krypto?' },
  'faq.a4': { en: 'Common taxable events: selling for fiat, trading for other crypto, purchases with crypto, and income from forks/mining/staking/yield. Timing and rules vary by country.', no: 'Vanlige skattepliktige hendelser: salg for fiat, bytte til annen krypto, kjøp med krypto og inntekter fra forks/mining/staking/yield. Tidspunkt og regler varierer etter land.' },
  'faq.q5': { en: 'How much tax do you have to pay on crypto?', no: 'Hvor mye skatt må du betale på krypto?' },
  'faq.a5': { en: 'Rates depend on holding period and income bracket. Short-term often taxed as ordinary income; long-term rates are usually lower. Crypto income is taxed at your regular rate.', no: 'Satsene avhenger av eiertid og inntektsnivå. Kortsiktige gevinster beskattes ofte som ordinær inntekt; langsiktige satser er vanligvis lavere. Kryptoinntekter beskattes til din ordinære sats.' },
  'faq.q6': { en: 'How does tax software help with my crypto taxes?', no: 'Hvordan hjelper skatteprogramvare med kryptoskatten?' },
  'faq.a6': { en: 'Software automates tracking, calculates gains/losses, and prepares forms. Syncing exchanges and wallets reduces errors and saves time.', no: 'Programvare automatiserer sporing, beregner gevinst/tap og forbereder skjemaer. Synk av børser og lommebøker reduserer feil og sparer tid.' },

  // Common
  'common.sync': { en: 'Sync', no: 'Synk' },
  'common.edit': { en: 'Edit', no: 'Rediger' },
  'common.delete': { en: 'Delete', no: 'Slett' },
  'common.cancel': { en: 'Cancel', no: 'Avbryt' },
  'common.confirm': { en: 'Confirm', no: 'Bekreft' },
  'common.loading': { en: 'Loading...', no: 'Laster...' },
  'common.logOut': { en: 'Log Out', no: 'Logg ut' },
  'common.lightMode': { en: 'Light Mode', no: 'Lys modus' },
  'common.darkMode': { en: 'Dark Mode', no: 'Mørk modus' },

  // Wallets
  'wallets.syncAll': { en: 'Sync All', no: 'Synk alle' },
  'wallets.addWallet': { en: 'Add wallet', no: 'Legg til lommebok' },
  'wallets.importCsv': { en: 'Import CSV', no: 'Importer CSV' },
  'wallets.tab.wallets': { en: 'Wallets', no: 'Lommebøker' },
  'wallets.tab.assets': { en: 'Assets', no: 'Eiendeler' },
  'wallets.searchPlaceholder': { en: 'Type to find a wallet or chain...', no: 'Skriv for å finne lommebok eller kjede...' },
  'wallets.sortBy': { en: 'Sort by', no: 'Sorter etter' },
  'wallets.sortByHighest': { en: 'Sort by Highest market value', no: 'Høyeste markedsverdi' },
  'wallets.sortByLowest': { en: 'Sort by Lowest market value', no: 'Laveste markedsverdi' },
  'wallets.sortByAlphabetical': { en: 'Sort by Alphabetical', no: 'Alfabetisk' },
  'wallets.loading': { en: 'Loading wallets...', no: 'Laster lommebøker...' },
  'wallets.noWallets': { en: 'No wallets connected', no: 'Ingen lommebøker koblet til' },
  'wallets.addFirst': { en: 'Add your first wallet to get started', no: 'Legg til din første lommebok for å komme i gang' },
  'wallets.transactions': { en: 'transactions', no: 'transaksjoner' },
  'wallets.otherTransactions': { en: 'Other transactions', no: 'Andre transaksjoner' },
  'wallets.assets': { en: 'assets', no: 'eiendeler' },
  'wallets.showZero': { en: 'Show wallets with 0 transactions', no: 'Vis lommebøker med 0 transaksjoner' },
  'wallets.selectWallet': { en: 'Select a Wallet', no: 'Velg en lommebok' },
  'wallets.clickWallet': { en: 'Click on a wallet from the list to view its details', no: 'Klikk på en lommebok i listen for detaljer' },
  'wallets.details': { en: 'Wallet Details', no: 'Lommebokdetaljer' },
  'wallets.viewOnEtherscan': { en: 'View on Etherscan', no: 'Se på Etherscan' },
  'wallets.blockchain': { en: 'Blockchain', no: 'Blokkjede' },
  'wallets.network': { en: 'Network', no: 'Nettverk' },
  'wallets.added': { en: 'Added', no: 'Lagt til' },
  'wallets.lastSynced': { en: 'Last Synced', no: 'Sist synkronisert' },
  'wallets.description': { en: 'Description', no: 'Beskrivelse' },

  // Assets (within Wallets page)
  'assets.addAsset': { en: 'Add Asset', no: 'Legg til eiendel' },
  'assets.search': { en: 'Search assets...', no: 'Søk i eiendeler...' },
  'assets.type': { en: 'Type', no: 'Type' },
  'assets.network': { en: 'Network', no: 'Nettverk' },
  'assets.quantity': { en: 'Quantity', no: 'Antall' },
  'assets.value': { en: 'Value', no: 'Verdi' },
  'assets.nft': { en: 'NFT', no: 'NFT' },
  'assets.token': { en: 'Token', no: 'Token' },
  'assets.custom': { en: 'Custom', no: 'Egendefinert' },
  'assets.none': { en: 'No assets found', no: 'Ingen eiendeler funnet' },
  'assets.edit': { en: 'Edit', no: 'Rediger' },
  'assets.delete': { en: 'Delete', no: 'Slett' },
  'assets.moreInfo': { en: 'More info', no: 'Mer info' },
  'assets.add.title': { en: 'Add Asset', no: 'Legg til eiendel' },
  'assets.name': { en: 'Name', no: 'Navn' },
  'assets.imageUrl': { en: 'Image URL (optional)', no: 'Bilde-URL (valgfritt)' },
  'assets.save': { en: 'Save', no: 'Lagre' },
  'assets.deleting': { en: 'Deleting...', no: 'Sletter...' },
  'assets.deleteConfirm': { en: 'Are you sure you want to delete this asset?', no: 'Er du sikker på at du vil slette denne eiendelen?' },

  // Transactions
  'transactions.addNew': { en: 'Add New', no: 'Legg til ny' },
  'transactions.searchPlaceholder': { en: 'AI powered search', no: 'AI-drevet søk' },
  'transactions.category': { en: 'Category', no: 'Kategori' },
  'transactions.wallet': { en: 'Wallet', no: 'Lommebok' },
  'transactions.currency': { en: 'Currency', no: 'Valuta' },
  'transactions.status': { en: 'Status', no: 'Status' },
  'transactions.date': { en: 'Date', no: 'Dato' },
  'transactions.hide': { en: 'Hide', no: 'Skjul' },
  'transactions.th.category': { en: 'Category', no: 'Kategori' },
  'transactions.th.sent': { en: 'Sent', no: 'Sendt' },
  'transactions.th.received': { en: 'Received', no: 'Mottatt' },
  'transactions.th.fee': { en: 'Fee', no: 'Gebyr' },
  'transactions.th.value': { en: 'Value', no: 'Verdi' },
  'transactions.th.gain': { en: 'Gain/Income', no: 'Gevinst/inntekt' },
  'transactions.th.date': { en: 'Date', no: 'Dato' },

  // Taxes
  'taxes.title': { en: 'Taxes', no: 'Skatt' },
  'taxes.inProgress': { en: 'In progress', no: 'Pågår' },
  'taxes.addTaxPro': { en: 'Add Tax Pro', no: 'Legg til skatterådgiver' },
  'taxes.totalCapitalGains': { en: 'Total capital gains', no: 'Totale kapitalgevinster' },
  'taxes.totalIncome': { en: 'Total income', no: 'Total inntekt' },
  'taxes.taxableCapitalGains': { en: 'Taxable Capital Gains', no: 'Skattepliktige kapitalgevinster' },
  'taxes.gainType': { en: 'Gain type', no: 'Gevinsttype' },
  'taxes.shortTerm': { en: 'Short term', no: 'Kortsiktig' },
  'taxes.longTerm': { en: 'Long term', no: 'Langsiktig' },
  'taxes.taxableIncome': { en: 'Taxable Income', no: 'Skattepliktig inntekt' },
  'taxes.type': { en: 'Type', no: 'Type' },
  'taxes.description': { en: 'Description', no: 'Beskrivelse' },
  'taxes.amountNok': { en: 'Amount (NOK)', no: 'Beløp (NOK)' },
  'taxes.totalTaxableIncome': { en: 'Total taxable income', no: 'Sum skattepliktig inntekt' },
  'taxes.otherTransactions': { en: 'Other Transactions', no: 'Andre transaksjoner' },
  'taxes.totalOtherTransactions': { en: 'Total other transactions', no: 'Sum andre transaksjoner' },
  'taxes.annualSummary': { en: 'Annual Tax Summary', no: 'Årlig skatteoppsummering' },
  'taxes.tab.exchanges': { en: 'Exchanges', no: 'Børser' },
  'taxes.tab.wallets': { en: 'Crypto wallets', no: 'Kryptolommebøker' },
  'taxes.tab.imported': { en: 'Imported wallets', no: 'Importerte lommebøker' },
  'taxes.tab.nfts': { en: 'NFTs', no: 'NFT-er' },
  'taxes.taxReports': { en: 'Tax Reports', no: 'Skatterapporter' },
  'taxes.csvReports': { en: 'CSV reports', no: 'CSV-rapporter' },
  'taxes.downloadCsv': { en: 'Download CSV', no: 'Last ned CSV' },
  'taxes.exportSkatteetaten.title': { en: 'Export to Skatteetaten', no: 'Eksporter til Skatteetaten' },
  'taxes.exportSkatteetaten.btn': { en: 'Export to Skatteetaten', no: 'Eksporter til Skatteetaten' },
  'taxes.transactionSummary': { en: 'Transaction Summary', no: 'Transaksjonsoppsummering' },
  'taxes.totalTransactionsThisYear': { en: 'Total transactions this year', no: 'Totale transaksjoner i år' },
  'taxes.sent': { en: 'Sent', no: 'Sendt' },
  'taxes.received': { en: 'Received', no: 'Mottatt' },
  'taxes.spam': { en: 'spam', no: 'søppel' },
  'taxes.unconfirmed': { en: 'unconfirmed', no: 'ubekreftet' },
  'taxes.tlh.title': { en: 'Tax Loss Harvesting Opportunities', no: 'Muligheter for skattetapsrealisering' },
  'taxes.tlh.estimated': { en: 'Estimated harvestable losses', no: 'Estimerte realiserbare tap' },
  'taxes.tlh.savings': { en: 'Potential tax savings', no: 'Potensielle skattebesparelser' },
  'taxes.tlh.assetsWithLosses': { en: 'Assets with losses', no: 'Aktiva med tap' },
  'taxes.tlh.topCandidates': { en: 'Top candidates', no: 'Beste kandidater' },
  'taxes.tlh.viewPlan': { en: 'View harvesting plan', no: 'Se plan for realisering' },

  // Performance
  'performance.totalReturn': { en: 'Total Return', no: 'Total avkastning' },
  'performance.unrealized': { en: 'Unrealized P&L', no: 'Urealisert P&L' },
  'performance.realized': { en: 'Realized P&L', no: 'Realisert P&L' },
  'performance.bestPerformer': { en: 'Best Performer', no: 'Beste aktiva' },
  'performance.pvb': { en: 'Portfolio vs. Benchmark', no: 'Portefølje vs. referanseindeks' },
  'performance.pvb_short': { en: 'Portfolio vs Benchmark', no: 'Portefølje vs referanseindeks' },
  'performance.customRange': { en: 'Custom Range', no: 'Egendefinert periode' },
  'performance.premium': { en: 'Premium feature', no: 'Premium-funksjon' },
  'performance.breakdownByCrypto': { en: 'Performance breakdown by crypto', no: 'Ytelsesfordeling per krypto' },
  'performance.upgrade': { en: 'Upgrade to unlock this feature', no: 'Oppgrader for å låse opp denne funksjonen' },
  'performance.upgradeNow': { en: 'Upgrade now', no: 'Oppgrader nå' },
  'performance.coinDiversity': { en: 'Coin Diversity', no: 'Myntdiversitet' },
  'performance.portfolioInsights': { en: 'Portfolio Insights', no: 'Porteføljeinnsikt' },
  'performance.tlh': { en: 'Tax loss harvesting', no: 'Skattetapsrealisering' },
  'performance.noOpportunities': { en: "You currently don't have opportunities to harvest tax losses.", no: 'Du har for øyeblikket ingen muligheter for skattetapsrealisering.' },
  'performance.previewImpact': { en: 'Preview impact', no: 'Forhåndsvis effekt' },
  'performance.fundsOnExchanges': { en: 'Funds on exchanges', no: 'Midler på børser' },
  'performance.learnMore': { en: 'Learn more', no: 'Les mer' },
  'performance.income': { en: 'Income', no: 'Inntekter' },
  'performance.expenses': { en: 'Expenses', no: 'Utgifter' },
  'performance.in': { en: 'In', no: 'Inn' },
  'performance.out': { en: 'Out', no: 'Ut' },

  // Prices
  'prices.search': { en: 'Search', no: 'Søk' },
  'prices.all': { en: 'All prices', no: 'Alle priser' },
  'prices.watchlist': { en: 'Watchlist', no: 'Overvåkningsliste' },
  'prices.th.coin': { en: 'Coin', no: 'Mynt' },
  'prices.th.price': { en: 'Price', no: 'Pris' },
  'prices.th.marketCap': { en: 'Market cap', no: 'Markedsverdi' },
  'prices.th.vol24h': { en: '24h vol', no: '24t volum' },
  'prices.th.circSupply': { en: 'Circulating supply', no: 'Sirkulerende mengde' },
  'prices.th.change24h': { en: '24h %', no: '24t %' },

  // AI Assistant
  'ai.title': { en: 'AI Assistant', no: 'AI-assistent' },
  'ai.quick.investment': { en: 'Investment idea', no: 'Investeringsidé' },
  'ai.quick.csv': { en: 'CSV help', no: 'CSV-hjelp' },
  'ai.quick.tax': { en: 'Tax Q', no: 'Skattespørsmål' },
  'ai.placeholder': { en: 'Type your question...', no: 'Skriv inn spørsmålet ditt...' },
  'ai.sending': { en: 'Sending...', no: 'Sender...' },
  'ai.send': { en: 'Send', no: 'Send' },
  'ai.assistant': { en: 'Assistant', no: 'Assistent' },
  'ai.you': { en: 'You', no: 'Du' },

  // Assets table
  'assets.title': { en: 'Your Assets', no: 'Dine eiendeler' },
  'assets.th.name': { en: 'Name', no: 'Navn' },
  'assets.th.price': { en: 'Price', no: 'Pris' },
  'assets.th.holdings': { en: 'Holdings', no: 'Beholdning' },
  'assets.th.unrealized': { en: 'All Time Unrealized Return', no: 'Urealisert avkastning (totalt)' },

  // Tax summary card
  'taxSummary.title': { en: 'Tax Summary', no: 'Skatteoppsummering' },
  'taxSummary.more': { en: 'More', no: 'Mer' },
  'taxSummary.taxYear': { en: 'Tax year', no: 'Skatteår' },
  'taxSummary.gains': { en: 'Gains', no: 'Gevinster' },
  'taxSummary.income': { en: 'Income', no: 'Inntekt' },
  'taxSummary.estimatedRate': { en: 'Estimated Tax Rate', no: 'Estimert skattesats' },
  'taxSummary.capitalGainsTax': { en: 'Capital gains tax', no: 'Kapitalgevinstskatt' },
  'taxSummary.taxablePnL': { en: 'Taxable P&L (Est.)', no: 'Skattepliktig P&L (est.)' },
  'taxSummary.unrealizedGains': { en: 'Unrealized gains', no: 'Urealiserte gevinster' },
  'taxSummary.estimatedDue': { en: 'Estimated Tax Due', no: 'Estimert skyldig skatt' },
  'taxSummary.basedOnCurrent': { en: 'Based on current gains', no: 'Basert på nåværende gevinster' },
  'taxSummary.shortVsLong': { en: 'Short-term vs Long-term', no: 'Kortsiktig vs langsiktig' },
  'taxSummary.shortGains': { en: 'Short-term gains:', no: 'Kortsiktige gevinster:' },
  'taxSummary.longGains': { en: 'Long-term gains:', no: 'Langsiktige gevinster:' },
  'taxSummary.tlh': { en: 'Tax Loss Harvesting', no: 'Skattetapsrealisering' },
  'taxSummary.potentialSavings': { en: 'Potential savings:', no: 'Potensielle besparelser:' },
  'taxSummary.harvestedLosses': { en: 'Harvested losses:', no: 'Realiserte tap:' },

  // Account health
  'health.pending': { en: 'Pending Tasks', no: 'Ventende oppgaver' },
  'health.ignored': { en: 'Ignored', no: 'Ignorert' },
  'health.allSyncing': { en: 'All your wallets are syncing correctly', no: 'Alle lommebøkene dine synkroniserer riktig' },
  'health.whyImportant': { en: 'Why is this important?', no: 'Hvorfor er dette viktig?' },
  'health.nothing': { en: 'Nothing to see here', no: 'Ingenting å se her' },
  'health.noIgnored': { en: 'You haven\'t ignored any tasks, so you can ignore this tab for now.', no: 'Du har ikke ignorert noen oppgaver, så du kan ignorere denne fanen for nå.' },

  // Add wallet form
  'addWallet.title': { en: 'Add New Wallet', no: 'Legg til ny lommebok' },
  'addWallet.walletName': { en: 'Wallet Name', no: 'Lommeboksnavn' },
  'addWallet.blockchain': { en: 'Blockchain *', no: 'Blokkjede *' },
  'addWallet.selectBlockchain': { en: 'Select blockchain', no: 'Velg blokkjede' },
  'addWallet.network': { en: 'Network *', no: 'Nettverk *' },
  'addWallet.selectNetwork': { en: 'Select network', no: 'Velg nettverk' },
  'addWallet.address': { en: 'Wallet Address *', no: 'Lommebokadresse *' },
  'addWallet.description': { en: 'Description (Optional)', no: 'Beskrivelse (valgfritt)' },
  'addWallet.adding': { en: 'Adding...', no: 'Legger til...' },
  'addWallet.add': { en: 'Add Wallet', no: 'Legg til lommebok' },
  'addWallet.cancel': { en: 'Cancel', no: 'Avbryt' },

  // Edit wallet form
  'editWallet.title': { en: 'Edit Wallet', no: 'Rediger lommebok' },
  'editWallet.address': { en: 'Wallet Address', no: 'Lommebokadresse' },
  'editWallet.addressNote': { en: 'Address cannot be changed', no: 'Adresse kan ikke endres' },
  'editWallet.blockchain': { en: 'Blockchain', no: 'Blokkjede' },
  'editWallet.blockchainNote': { en: 'Blockchain cannot be changed', no: 'Blokkjede kan ikke endres' },
  'editWallet.walletName': { en: 'Wallet Name', no: 'Lommeboksnavn' },
  'editWallet.description': { en: 'Description (Optional)', no: 'Beskrivelse (valgfritt)' },
  'editWallet.updating': { en: 'Updating...', no: 'Oppdaterer...' },
  'editWallet.update': { en: 'Update Wallet', no: 'Oppdater lommebok' },
  'editWallet.cancel': { en: 'Cancel', no: 'Avbryt' },

  // Settings
  'settings.tabs.account': { en: 'Account', no: 'Konto' },
  'settings.tabs.tax': { en: 'Tax', no: 'Skatt' },
  'settings.tabs.subscription': { en: 'Subscription', no: 'Abonnement' },
  'settings.tabs.notifications': { en: 'Notifications', no: 'Varsler' },

  // Settings: Account
  'settings.account.email': { en: 'Email', no: 'E-post' },
  'settings.account.password': { en: 'Password', no: 'Passord' },
  'settings.account.resetPassword': { en: 'Reset password', no: 'Tilbakestill passord' },
  'settings.account.uiTheme': { en: 'UI Theme', no: 'UI-tema' },
  'settings.account.uiTheme.system': { en: 'System', no: 'System' },

  // Settings: Location & Language
  'settings.location.homeCountry': { en: 'Home country', no: 'Hjemland' },
  'settings.location.homeCountryValue': { en: 'Norway', no: 'Norge' },
  'settings.location.baseCurrency': { en: 'Base currency', no: 'Grunnvaluta' },
  'settings.location.baseCurrencyValue': { en: 'Norwegian Krone', no: 'Norske kroner' },
  'settings.location.language': { en: 'Language', no: 'Språk' },
  'settings.location.customCurrencies': { en: 'Custom currencies', no: 'Egendefinerte valutaer' },

  // Settings: Security
  'settings.security.tfa.title': { en: 'Two factor authentication', no: 'Tofaktorautentisering' },
  'settings.security.tfa.desc': { en: 'Secure your Kryptools account with an additional layer of security.', no: 'Sikre Kryptools-kontoen din med et ekstra sikkerhetslag.' },
  'settings.security.tfa.enable': { en: 'Enable two factor authentication', no: 'Aktiver tofaktorautentisering' },

  // Settings: Support permission
  'settings.support.title': { en: 'Permission for Kryptools Support to view my account', no: 'Tillatelse for Kryptools Support til å se kontoen min' },
  'settings.support.desc': { en: 'This enables Kryptools support to view your Kryptools account in order to troubleshoot issues. You can revoke access any time.', no: 'Dette gjør at Kryptools support kan se kontoen din for å feilsøke problemer. Du kan når som helst oppheve tilgangen.' },
  'settings.support.enable': { en: 'Allow support access', no: 'Tillat supporttilgang' },

  // Settings: Tax professional
  'settings.taxPro.title': { en: 'I am a tax professional', no: 'Jeg er en skatterådgiver' },
  'settings.taxPro.status': { en: 'Tax professional status', no: 'Skatterådgiverstatus' },

  // Settings: Delete account
  'settings.delete.title': { en: 'Delete account', no: 'Slett konto' },
  'settings.delete.desc': { en: 'This deletes all your Kryptools account data including exchanges, wallets, transactions and trade history. This action is irreversible.', no: 'Dette sletter all kontodata i Kryptools, inkludert børser, lommebøker, transaksjoner og handelshistorikk. Denne handlingen kan ikke angres.' },
  'settings.delete.cta': { en: 'Delete account', no: 'Slett konto' },

  // Settings: Tax tab
  'settings.tax.costBasis.title': { en: 'Cost basis method', no: 'Kostpris-metode' },
  'settings.tax.costBasis.desc': { en: 'This is the only cost basis method available for your country.', no: 'Dette er den eneste kostpris-metoden tilgjengelig for ditt land.' },
  'settings.tax.costBasis.value': { en: 'FIFO', no: 'FIFO' },
  'settings.tax.costTracking.title': { en: 'Cost basis tracking', no: 'Sporing av kostpris' },
  'settings.tax.costTracking.value': { en: 'Universal', no: 'Universell' },
  'settings.tax.taxYear.title': { en: 'Tax year', no: 'Skatteår' },
  'settings.tax.taxYear.value': { en: 'January 1st to December 31st', no: '1. januar til 31. desember' },
  'settings.tax.liquidStaking.title': { en: 'Treat liquid staking as non-taxable', no: 'Behandle «liquid staking» som ikke skattepliktig' },
  'settings.tax.wrapping.title': { en: 'Treat wrapping as non-taxable', no: 'Behandle wrapping som ikke skattepliktig' },
  'settings.tax.lending.title': { en: 'Treat liquid lending as non-taxable', no: 'Behandle «liquid lending» som ikke skattepliktig' },
  'settings.tax.lp.title': { en: 'Treat liquidity pool transactions as non-taxable', no: 'Behandle likviditetspool-transaksjoner som ikke skattepliktige' },
  'settings.tax.stakingRewards.title': { en: 'Treat staking rewards as non-taxable', no: 'Behandle staking-belønninger som ikke skattepliktige' },

  // Settings: common values
  'common.off': { en: 'Off', no: 'Av' },
  'common.on': { en: 'On', no: 'På' },

  // Settings: Subscription tab
  'settings.sub.choosePlanTitle': { en: "Choose the plan that's right for you", no: 'Velg planen som passer for deg' },
  'settings.sub.taglineLine1': { en: 'We take care of your crypto taxes accurately, quickly, and securely', no: 'Vi tar hånd om krypto-skattene dine nøyaktig, raskt og sikkert' },
  'settings.sub.taglineLine2': { en: 'so you can file online or with your tax professional', no: 'slik at du kan levere online eller med din skatterådgiver' },
  'settings.sub.badge.integrations': { en: '500+ crypto integrations', no: '500+ krypto-integrasjoner' },
  'settings.sub.badge.tripletex': { en: 'File directly with Tripletex and Fiken', no: 'Lever direkte med Tripletex og Fiken' },

  'settings.sub.plan.base.tier': { en: 'Simple', no: 'Enkel' },
  'settings.sub.plan.base.name': { en: 'Base', no: 'Base' },
  'settings.sub.plan.base.price': { en: 'NOK 59', no: 'NOK 59' },
  'settings.sub.plan.base.cta': { en: 'Get Base →', no: 'Velg Base →' },
  'settings.sub.plan.prime.badge': { en: 'Best value', no: 'Beste verdi' },
  'settings.sub.plan.prime.name': { en: 'Prime', no: 'Prime' },
  'settings.sub.plan.prime.price': { en: 'NOK 199', no: 'NOK 199' },
  'settings.sub.plan.prime.cta': { en: 'Get Prime →', no: 'Velg Prime →' },
  'settings.sub.plan.ultra.tier': { en: 'Advanced', no: 'Avansert' },
  'settings.sub.plan.ultra.name': { en: 'Ultra', no: 'Ultra' },
  'settings.sub.plan.ultra.price': { en: 'NOK 599', no: 'NOK 599' },
  'settings.sub.plan.ultra.cta': { en: 'Get Ultra →', no: 'Velg Ultra →' },
  'settings.sub.plan.full.tier': { en: 'Bespoke', no: 'Skreddersydd' },
  'settings.sub.plan.full.name': { en: 'Full Service', no: 'Full service' },
  'settings.sub.plan.full.price': { en: 'NOK 3499', no: 'NOK 3499' },
  'settings.sub.plan.full.cta': { en: 'Get Full Service →', no: 'Velg Full service →' },
  'settings.sub.plan.full.contact': { en: 'Contact us', no: 'Kontakt oss' },

  // Settings: features and limits
  'settings.sub.feature.portfolioTracking': { en: 'Portfolio tracking', no: 'Porteføljesporing' },
  'settings.sub.feature.tripletexFiken': { en: 'Tripletex and Fiken integrations', no: 'Tripletex- og Fiken-integrasjoner' },
  'settings.sub.feature.taxReports': { en: 'Tax reports for 2024 and all past years', no: 'Skatterapporter for 2024 og alle tidligere år' },
  'settings.sub.feature.taxLots': { en: 'Tax lots breakdown', no: 'Detaljert skattegrunnlag' },
  'settings.sub.feature.tlh': { en: 'Tax loss harvesting', no: 'Skattetapsrealisering' },
  'settings.sub.feature.prioritySupport': { en: 'Priority support', no: 'Prioritert support' },
  'settings.sub.feature.performance': { en: 'Performance tracking', no: 'Ytelsessporing' },                   
  'settings.sub.feature.changeCostBasis': { en: 'Change cost basis method by year', no: 'Endre kostpris-metode per år' },
  'settings.sub.feature.full.accountManager': { en: 'A dedicated account manager that works with you to manage your CoinTracker account.', no: 'En dedikert kundekontakt som hjelper deg å administrere CoinTracker-kontoen din.' },
  'settings.sub.feature.full.csvHelp': { en: 'Personal assistance in managing and importing CSV files.', no: 'Personlig hjelp med håndtering og import av CSV-filer.' },
  'settings.sub.feature.full.expertTeam': { en: 'A dedicated team of experts ready to work with you to review transactions, identify and fix errors, and reconcile your accounts.', no: 'Et dedikert ekspertteam som hjelper deg å gjennomgå transaksjoner, identifisere og rette feil og avstemme kontoer.' },
  'settings.sub.feature.full.quarterlyHealth': { en: "Quarterly account health reviews so you're ready and confident well before tax deadlines.", no: 'Kvartalsvise helsesjekker av konto, slik at du er klar og trygg i god tid før skattemyfristene.' },
  'settings.sub.limit.base': { en: 'Up to 100 transactions per year', no: 'Opptil 100 transaksjoner per år' },
  'settings.sub.limit.prime': { en: 'Up to 1,000 transactions per year', no: 'Opptil 1 000 transaksjoner per år' },
  'settings.sub.limit.ultra': { en: 'Up to 10,000 transactions per year', no: 'Opptil 10 000 transaksjoner per år' },
  'settings.sub.limit.full': { en: 'This plan allows up to 300k transactions. Contact us if you are looking for higher limits or more support.', no: 'Denne planen tillater opptil 300 000 transaksjoner. Kontakt oss hvis du trenger høyere grenser eller mer støtte.' },
  'settings.sub.progress': { en: "You're at 3%", no: 'Du er på 3 %' },

  // Settings: Notifications
  'settings.notifications.title': { en: 'Notifications', no: 'Varsler' },
  'settings.notifications.desc': { en: 'Notification preferences will be displayed here.', no: 'Varslingsinnstillinger vises her.' },

  // Landing
  'landing.hero.line1': { en: 'Track Your Crypto', no: 'Spor alle transaksjoner' },
  'landing.hero.line2': { en: 'Calculate Your Taxes', no: 'Beregn skatten din' },
  'landing.hero.auto': { en: 'Automatically', no: 'Automatisk' },
  'landing.hero.desc': { en: 'Connect your wallets and exchanges, track your assets automatically, and generate accurate tax reports with ease. Take control of your crypto finances.', no: 'Koble til lommebøker og børser, spor eiendeler automatisk, og generer nøyaktige skatterapporter. Krypto gjort enkelt.' },
  'landing.hero.cta': { en: 'Get started', no: 'Kom i gang' },
  'landing.hero.how': { en: 'See how it works', no: 'Se hvordan det fungerer →' },
  'landing.hero.badge': { en: 'No credit card required • Set up in 2 minutes', no: 'Ingen kredittkort nødvendig • Kom i gang på 2 minutter' },
  'landing.whatYouGet': { en: 'What You Get', no: 'Dette får du' },
  'landing.everythingTitle': { en: 'Everything You Need in One Place', no: 'Alt du trenger på ett sted' },
  'landing.everythingDesc': { en: 'Stop using spreadsheets and multiple apps. We bring all your crypto information together so you can focus on making smart investment decisions.', no: 'Slutt å bruke regneark og mange apper. Vi samler all krypto-informasjon så du kan fokusere på smarte investeringsvalg.' },
  'landing.feature.tax.title': { en: 'Simplified Tax Reporting', no: 'Forenklet skatterapportering' },
  'landing.feature.tax.desc': { en: 'Generate comprehensive tax reports compatible with tax software. Calculate capital gains and losses effortlessly.', no: 'Generer omfattende skatterapporter kompatible med skatteprogram. Beregn gevinst og tap uten anstrengelse.' },
  'landing.feature.tracking.title': { en: 'Automatic Portfolio Tracking', no: 'Automatisk porteføljesporing' },
  'landing.feature.tracking.desc': { en: 'Connect your wallets and exchanges to automatically sync transactions and track your crypto portfolio value in real time.', no: 'Koble til lommebøker og børser for automatisk synk av transaksjoner og sanntidssporing av porteføljeverdi.' },
  'landing.feature.overview.title': { en: 'Comprehensive Asset Overview', no: 'Omfattende aktivoversikt' },
  'landing.feature.overview.desc': { en: 'View all your crypto assets across different wallets and blockchains in one unified dashboard.', no: 'Se alle kryptoaktiva på tvers av lommebøker og blokkjeder i ett samlet dashbord.' },
  'landing.feature.secure.title': { en: 'Secure & Private', no: 'Sikkert og privat' },
  'landing.feature.secure.desc': { en: 'Your financial data matters. We prioritize security and privacy in handling your information.', no: 'Din finansielle data er viktig. Vi prioriterer sikkerhet og personvern.' },
  'landing.slogan.line1': { en: 'More than just a', no: 'Mer enn bare en' },
  'landing.slogan.line2': { en: 'Tax Calculator.', no: 'Skattekalkulator.' },
  'landing.slogan.desc': { en: 'Join thousands of crypto investors who trust us with their portfolio tracking and tax reporting.', no: 'Bli med tusenvis av kryptoinvestorer som stoler på oss for porteføljesporing og skatterapportering.' },

  // Auth
  'auth.backHome': { en: 'Back to Home', no: 'Tilbake til hjem' },
  'auth.signin.title': { en: 'Welcome back', no: 'Velkommen tilbake' },
  'auth.signin.desc': { en: 'Enter your credentials to access your portfolio', no: 'Skriv inn legitimasjon for å få tilgang til porteføljen din' },
  'auth.email': { en: 'Email', no: 'E-post' },
  'auth.password': { en: 'Password', no: 'Passord' },
  'auth.email.placeholder': { en: 'Enter your email', no: 'Skriv inn e-posten din' },
  'auth.password.placeholder': { en: 'Enter your password', no: 'Skriv inn passordet ditt' },
  'auth.signin': { en: 'Sign in', no: 'Logg inn' },
  'auth.signingIn': { en: 'Signing in...', no: 'Logger inn...' },
  'auth.noAccount': { en: "Don't have an account? ", no: 'Har du ikke en konto? ' },
  'auth.signup': { en: 'Sign up', no: 'Registrer deg' },
  'auth.signup.title': { en: 'Create account', no: 'Opprett konto' },
  'auth.signup.desc': { en: 'Sign up to start tracking your crypto portfolio', no: 'Registrer deg for å spore kryptoen din' },
  'auth.password.placeholderCreate': { en: 'Create a password (min 6 characters)', no: 'Lag et passord (min 6 tegn)' },
  'auth.password.confirm': { en: 'Confirm Password', no: 'Bekreft passord' },
  'auth.password.confirmPlaceholder': { en: 'Confirm your password', no: 'Bekreft passordet ditt' },
  'auth.creating': { en: 'Creating account...', no: 'Oppretter konto...' },
  'auth.create': { en: 'Create account', no: 'Opprett konto' },
  'auth.haveAccount': { en: 'Already have an account? ', no: 'Har du allerede en konto? ' },
  'auth.signinShort': { en: 'Sign in', no: 'Logg inn' },

  // CSV Import
  'csv.title': { en: 'Import Transactions from CSV', no: 'Importer transaksjoner fra CSV' },
  'csv.chooseFileError': { en: 'Please choose a CSV file', no: 'Velg en CSV-fil' },
  'csv.importError': { en: 'Failed to import CSV. Please try again.', no: 'Kunne ikke importere CSV. Prøv igjen.' },
  'csv.cancel': { en: 'Cancel', no: 'Avbryt' },
  'csv.import': { en: 'Import', no: 'Importer' },
  'csv.importing': { en: 'Importing...', no: 'Importerer...' },
  'csv.supportedCols': { en: 'CSV columns supported: date, type, asset, amount, fee, tx_hash, note', no: 'Støttede CSV-kolonner: date, type, asset, amount, fee, tx_hash, note' },

  // Add Transaction
  'tx.add.title': { en: 'Add Transaction', no: 'Legg til transaksjon' },
  'tx.wallet': { en: 'Wallet *', no: 'Lommebok *' },
  'tx.wallet.placeholder': { en: 'Select a wallet', no: 'Velg en lommebok' },
  'tx.type': { en: 'Transaction Type *', no: 'Transaksjonstype *' },
  'tx.type.placeholder': { en: 'Select transaction type', no: 'Velg transaksjonstype' },
  'tx.date': { en: 'Date *', no: 'Dato *' },
  'tx.currency': { en: 'Currency *', no: 'Valuta *' },
  'tx.amount': { en: 'Amount *', no: 'Beløp *' },
  'tx.worth': { en: 'Worth (USD)', no: 'Verdi (USD)' },
  'tx.description': { en: 'Description', no: 'Beskrivelse' },
  'tx.description.placeholder': { en: 'Transaction description', no: 'Transaksjonsbeskrivelse' },
  'tx.tag': { en: 'Tag', no: 'Tagg' },
  'tx.tag.placeholder': { en: 'e.g., Trading, Investment', no: 'f.eks. Trading, Investering' },
  'tx.adding': { en: 'Adding...', no: 'Legger til...' },
  'tx.add': { en: 'Add Transaction', no: 'Legg til transaksjon' },
  'tx.cancel': { en: 'Cancel', no: 'Avbryt' },

  // Spam
  'spam.tab.potential': { en: 'Potential spam', no: 'Potensiell søppel' },
  'spam.tab.resolved': { en: 'Resolved spam', no: 'Løst søppel' },
  'spam.markAll': { en: 'Mark all as spam', no: 'Marker alle som søppel' },
  'spam.desc': { en: "We suspect these assets might be spam. Consider marking them as either spam or not spam to improve your account's accuracy and exclude them from tax and portfolio calculations.", no: 'Vi mistenker at disse eiendelene kan være søppel. Vurder å merke dem som søppel eller ikke for å forbedre nøyaktigheten og ekskludere dem fra skatt- og porteføljeberegninger.' },
  'spam.assetName': { en: 'Asset name', no: 'Eiendelsnavn' },
  'spam.network': { en: 'Network', no: 'Nettverk' },
  'spam.contract': { en: 'Contract address', no: 'Kontraktadresse' },
  'spam.notSpam': { en: 'Not spam', no: 'Ikke søppel' },
  'spam.spam': { en: 'Spam', no: 'Søppel' },
  'spam.autoResolved': { en: 'auto-resolved', no: 'auto-løst' },
  'spam.manual': { en: 'manual', no: 'manuell' },

  // TLH page
  'tlh.title': { en: 'Tax Loss Harvesting', no: 'Skattetapsrealisering' },
  'tlh.inProgress': { en: 'In progress', no: 'Pågår' },
  'tlh.settings': { en: 'Settings', no: 'Innstillinger' },
  'tlh.kpi.estimatedLosses': { en: 'Estimated harvestable losses', no: 'Estimerte realiserbare tap' },
  'tlh.kpi.potentialSavings': { en: 'Potential tax savings', no: 'Potensielle skattebesparelser' },
  'tlh.kpi.assetsWithLosses': { en: 'Assets with losses', no: 'Aktiva med tap' },
  'tlh.candidates.title': { en: 'Top candidates', no: 'Beste kandidater' },
  'tlh.candidates.taxMethod': { en: 'Tax method', no: 'Skattemetode' },
  'tlh.candidates.washWindow': { en: 'Wash window', no: 'Vaskevindu' },
  'tlh.candidates.feesIncluded': { en: 'included', no: 'inkludert' },
  'tlh.candidates.feesExcluded': { en: 'excluded', no: 'ekskludert' },
  'tlh.th.asset': { en: 'Asset', no: 'Eiendel' },
  'tlh.th.holdings': { en: 'Holdings', no: 'Beholdning' },
  'tlh.th.price': { en: 'Price', no: 'Pris' },
  'tlh.th.costBasis': { en: 'Cost basis', no: 'Kostpris' },
  'tlh.th.unrealizedLoss': { en: 'Unrealized loss', no: 'Urealisert tap' },
  'tlh.th.dayChange': { en: '24h', no: '24t' },
  'tlh.th.washWindow': { en: 'Wash sale window', no: 'Vaskesalgsperiode' },
  'tlh.th.action': { en: 'Action', no: 'Handling' },
  'tlh.add': { en: 'Add', no: 'Legg til' },
  'tlh.plan.title': { en: 'Harvesting plan', no: 'Høstingsplan' },
  'tlh.plan.projected': { en: 'Projected savings', no: 'Anslåtte besparelser' },
  'tlh.plan.empty': { en: 'No actions yet. Add candidates from the left to build your plan.', no: 'Ingen handlinger ennå. Legg til kandidater fra venstre for å bygge planen.' },
  'tlh.plan.th.asset': { en: 'Asset', no: 'Eiendel' },
  'tlh.plan.th.qty': { en: 'Quantity to sell', no: 'Antall å selge' },
  'tlh.plan.th.savings': { en: 'Est. savings', no: 'Est. besparelser' },
  'tlh.plan.th.remove': { en: 'Remove', no: 'Fjern' },
  'tlh.plan.generatePdf': { en: 'Generate plan PDF', no: 'Generer plan-PDF' },
  'tlh.plan.exportCsv': { en: 'Export CSV', no: 'Eksporter CSV' },
  'tlh.how.title': { en: 'How tax loss harvesting works', no: 'Hvordan skattetapsrealisering fungerer' },
  'tlh.how.line1': { en: 'Selling crypto that\'s gone down in value can offset the profits you\'ve made by selling investments that have gone up. By "harvesting" these losses, you can potentially reduce your tax liability. Learn more about tax loss harvesting', no: 'Salg av krypto som har falt i verdi kan motvirke gevinster fra investeringer som har steget. Ved å «høste» disse tapene kan du potensielt redusere skattepliktig inntekt. Les mer om skattetapsrealisering' },
  'tlh.how.here': { en: 'here', no: 'her' },
  'tlh.how.line2': { en: 'Avoid repurchasing substantially identical assets within your wash-sale window ({days} days) to preserve realized loss benefits.', no: 'Unngå å kjøpe tilbake vesentlig identiske eiendeler innenfor vaskevinduet ditt ({days} dager) for å bevare fordelene av realiserte tap.' },
  'tlh.disclaimer': { en: 'Disclaimer: None of the above is or should be construed as legal, tax, audit, accounting, or brokerage advice. All information is provided for informational purposes only.', no: 'Ansvarsfraskrivelse: Ingenting ovenfor er eller skal tolkes som juridisk, skattemessig, revisjon, regnskaps- eller megler-råd. All informasjon er kun til informasjonsformål.' },
}

type LanguageContextType = {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: keyof typeof DICT) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageCode>('no')

  useEffect(() => {
    const saved = (localStorage.getItem('lang') as LanguageCode | null) || 'no'
    setLanguage(saved)
    document.documentElement.lang = saved === 'no' ? 'no' : 'en'
  }, [])

  const change = (lang: LanguageCode) => {
    setLanguage(lang)
    localStorage.setItem('lang', lang)
    document.documentElement.lang = lang === 'no' ? 'no' : 'en'
  }

  const t = (key: keyof typeof DICT) => DICT[key]?.[language] ?? DICT[key]?.en ?? String(key)

  const value = useMemo(() => ({ language, setLanguage: change, t }), [language])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}


