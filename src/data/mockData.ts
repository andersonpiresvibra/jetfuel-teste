
import { FlightData, FlightStatus, Operator, OperatorProfile, FlightLog, ChatMessage, Vehicle } from '../types';

// Helper para criar logs
const createLog = (minutesAgo: number, type: 'SISTEMA' | 'MANUAL' | 'OBSERVACAO' | 'ALERTA', message: string, author: string = 'SISTEMA'): FlightLog => ({
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(new Date().getTime() - minutesAgo * 60000),
    type,
    message,
    author
});

// Helper para criar mensagens de chat
const createMsg = (minutesAgo: number, sender: string, text: string, isManager: boolean = false): ChatMessage => ({
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(new Date().getTime() - minutesAgo * 60000),
    sender,
    text,
    isManager
});



export const GOL_B737_7_PREFIXES = [
  'PR-GEA', 'PR-GEC', 'PR-GED', 'PR-GEH', 'PR-GEI', 'PR-GEJ', 'PR-GEK', 'PR-GEQ', 'PR-GIH', 'PR-GOQ', 'PR-GOR', 'PR-VBQ'
];

export const GOL_B737_8_PREFIXES = [
  'PR-GGE', 'PR-GGF', 'PR-GGH', 'PR-GGL', 'PR-GGM', 'PR-GGP', 'PR-GGQ', 'PR-GGR', 'PR-GGX', 'PR-GKA', 'PR-GKB', 'PR-GKC', 'PR-GKD', 'PR-GKE', 'PR-GTC', 'PR-GTE', 'PR-GTG', 'PR-GTH', 'PR-GTL', 'PR-GTM', 'PR-GUB', 'PR-GUC', 'PR-GUE', 'PR-GUF', 'PR-GUH', 'PR-GUI', 'PR-GUJ', 'PR-GUK', 'PR-GUL', 'PR-GUM', 'PR-GUN', 'PR-GUP', 'PR-GUR', 'PR-GUT', 'PR-GUU', 'PR-GUV', 'PR-GUX', 'PR-GUY', 'PR-GUZ', 'PR-GXA', 'PR-GXB', 'PR-GXC', 'PR-GXD', 'PR-GXE', 'PR-GXH', 'PR-GXI', 'PR-GXJ', 'PR-GXL', 'PR-GXM', 'PR-GXN', 'PR-GXP', 'PR-GXQ', 'PR-GXR', 'PR-GXT', 'PR-GXU', 'PR-GXV', 'PR-GXW', 'PR-GXX', 'PR-GYA', 'PR-GYD', 'PR-GZH', 'PR-GZI', 'PR-GZS', 'PR-GZU', 'PR-GZV', 'PR-VBF', 'PR-VBG', 'PR-VBK', 'PS-GFA', 'PS-GFB', 'PS-GFC', 'PS-GFD', 'PS-GFE', 'PS-GFF', 'PS-GFG', 'PS-GFH', 'PS-GFI', 'PR-XMA', 'PR-XMB', 'PR-XMC', 'PR-XMD', 'PR-XME', 'PR-XMF', 'PR-XMG', 'PR-XMH', 'PR-XMI', 'PR-XMJ', 'PR-XMK', 'PR-XML', 'PR-XMM', 'PR-XMN', 'PR-XMO', 'PR-XMP', 'PR-XMQ', 'PR-XMR', 'PR-XMS', 'PR-XMT', 'PR-XMU', 'PR-XMV', 'PR-XMW', 'PR-XMX', 'PR-XMY', 'PR-XMZ', 'PS-GOL', 'PS-GPA', 'PS-GPB', 'PS-GPC', 'PS-GPD', 'PS-GPE', 'PS-GPF', 'PS-GPG', 'PS-GPH', 'PS-GPI', 'PS-GPJ', 'PS-GPK', 'PS-GPL', 'PS-GPM', 'PS-GPN', 'PS-GPO', 'PS-GPP', 'PS-GPQ', 'PS-GPR', 'PS-GRA', 'PS-GRB', 'PS-GRC', 'PS-GRD', 'PS-GRE', 'PS-GRF', 'PS-GRG', 'PS-GRH', 'PS-GRI', 'PS-GRJ', 'PS-GRK', 'PS-GRL', 'PS-GRO', 'PS-GRQ', 'PS-GRR', 'PS-GRS', 'PS-GRT', 'PS-GRU', 'PS-GRV', 'PS-GRW', 'PS-GRY', 'PS-GRZ'
];

// === LISTA DE OPERADORES ===
export const MOCK_OPERATORS: Operator[] = [
    { id: 'op_horacio', name: 'Horácio', status: 'OCUPADO', vehicleType: 'SERVIDOR' },
    { id: 'op_carlos', name: 'Carlos', status: 'OCUPADO', vehicleType: 'SERVIDOR' },
    { id: 'op_bruno', name: 'Bruno', status: 'OCUPADO', vehicleType: 'SERVIDOR' },
    { id: 'op_felipe', name: 'Felipe', status: 'DISPONÍVEL', vehicleType: 'SERVIDOR' },
    { id: 'op_andre', name: 'André', status: 'OCUPADO', vehicleType: 'SERVIDOR' },
    { id: 'op_gabriel', name: 'Gabriel', status: 'OCUPADO', vehicleType: 'SERVIDOR' },
    { id: 'op_rodrigo', name: 'Rodrigo', status: 'OCUPADO', vehicleType: 'SERVIDOR' },
    { id: 'op_marcelo', name: 'Marcelo', status: 'DISPONÍVEL', vehicleType: 'SERVIDOR' },
    { id: 'op_sergio', name: 'Sérgio', status: 'DISPONÍVEL', vehicleType: 'SERVIDOR' },
    { id: 'op_ricardo', name: 'Ricardo', status: 'OCUPADO', vehicleType: 'SERVIDOR' },
    { id: 'op_betao', name: 'Betão', status: 'ENCHIMENTO', vehicleType: 'CTA' },
    { id: 'op_tiago', name: 'Tiago', status: 'ENCHIMENTO', vehicleType: 'CTA' },
    { id: 'op_lucas', name: 'Lucas', status: 'DISPONÍVEL', vehicleType: 'CTA' },
    { id: 'op_eduardo', name: 'Eduardo', status: 'OCUPADO', vehicleType: 'CTA' },
    { id: 'op_roberto', name: 'Roberto', status: 'DISPONÍVEL', vehicleType: 'CTA' },
    { id: 'op_mariana', name: 'Mariana', status: 'OCUPADO', vehicleType: 'CTA' },
];

export const MOCK_FLIGHTS: FlightData[] = [
  { 
    id: '1', 
    flightNumber: 'RG-1442', 
    departureFlightNumber: 'RG-1443',
    airline: 'GOL', 
    airlineCode: 'RG', 
    model: 'B737-MAX8',
    registration: 'PR-XMA',
    origin: 'SBRJ', 
    destination: 'SBGL', 
    eta: '03:30', 
    etd: '04:15',
    positionId: '204', 
    fuelStatus: 100, 
    status: FlightStatus.FINALIZADO,
    operator: 'Horácio',
    fleet: '2125',
    vehicleType: 'SERVIDOR',
    volume: 6500,
    designationTime: new Date(new Date().getTime() - 120 * 60000),
    startTime: new Date(new Date().getTime() - 105 * 60000),
    endTime: new Date(new Date().getTime() - 75 * 60000),
    maxFlowRate: 1150,
    currentFlowRate: 0,
    messages: [],
    logs: [
        createLog(120, 'SISTEMA', 'Voo criado via integração malha GOL.', 'INTEGRAÇÃO'),
        createLog(60, 'MANUAL', 'Operador Horácio designado.', 'Mesa'),
        createLog(45, 'SISTEMA', 'Início de abastecimento detectado.', 'Horácio'),
        createLog(15, 'SISTEMA', 'Abastecimento finalizado. Volume: 6500L.', 'Horácio'),
    ]
  },
  // --- 1. ABASTECENDO (NORMAL) - DENTRO DO PRAZO ---
  { 
    id: 'ab-n-d-1', 
    flightNumber: 'RG-1001', 
    departureFlightNumber: 'RG-1002',
    airline: 'GOL', 
    airlineCode: 'RG', 
    model: 'B737-800',
    registration: 'PR-GGE',
    origin: 'SBSP', 
    destination: 'SBCF', 
    eta: '08:00', 
    etd: '14:30', // Bem no futuro
    positionId: '201', 
    fuelStatus: 40, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Carlos',
    fleet: '2108',
    vehicleType: 'SERVIDOR',
    volume: 12000,
    designationTime: new Date(new Date().getTime() - 60 * 60000),
    startTime: new Date(new Date().getTime() - 50 * 60000),
    maxFlowRate: 1200,
    currentFlowRate: 1100,
    messages: [],
    logs: []
  },
  { 
    id: 'ab-n-d-2', 
    flightNumber: 'LA-2001', 
    departureFlightNumber: 'LA-2002',
    airline: 'LATAM', 
    airlineCode: 'LA', 
    model: 'A320',
    registration: 'PR-TYT',
    origin: 'SBGR', 
    destination: 'SBRJ', 
    eta: '08:15', 
    etd: '15:15', // Bem no futuro
    positionId: '203', 
    fuelStatus: 30, 
    status: FlightStatus.ABASTECENDO,
    operator: 'André',
    fleet: '2177',
    vehicleType: 'SERVIDOR',
    volume: 4500,
    designationTime: new Date(new Date().getTime() - 40 * 60000),
    startTime: new Date(new Date().getTime() - 30 * 60000),
    maxFlowRate: 1100,
    currentFlowRate: 1050,
    messages: [],
    logs: []
  },

  // --- 2. ABASTECENDO (NORMAL) - ATRASADO ---
  { 
    id: 'ab-n-a-1', 
    flightNumber: 'RG-1105', 
    departureFlightNumber: 'RG-1106',
    airline: 'GOL', 
    airlineCode: 'RG', 
    model: 'B737-800',
    registration: 'PR-GTG',
    origin: 'SBSV', 
    destination: 'SBGL', 
    eta: '03:30', 
    etd: '04:45', // Já passou (Atrasado)
    positionId: '211', 
    fuelStatus: 45, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Bruno',
    fleet: '2160',
    vehicleType: 'SERVIDOR',
    volume: 4500,
    designationTime: new Date(new Date().getTime() - 100 * 60000),
    startTime: new Date(new Date().getTime() - 90 * 60000),
    maxFlowRate: 980,
    currentFlowRate: 950,
    messages: [],
    logs: [
        createLog(10, 'ALERTA', 'Voo operando com ETD estourado.', 'SISTEMA'),
    ]
  },
  { 
    id: 'ab-n-a-2', 
    flightNumber: 'LA-4540', 
    departureFlightNumber: 'LA-4541',
    airline: 'LATAM', 
    airlineCode: 'LA', 
    model: 'A321',
    registration: 'PT-MXP',
    origin: 'SBCT', 
    destination: 'SBKP', 
    eta: '03:40', 
    etd: '05:00', // Já passou (Atrasado)
    positionId: '208', 
    fuelStatus: 60, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Sérgio',
    fleet: '2174',
    vehicleType: 'SERVIDOR',
    volume: 5000,
    designationTime: new Date(new Date().getTime() - 90 * 60000),
    startTime: new Date(new Date().getTime() - 80 * 60000),
    maxFlowRate: 1100,
    currentFlowRate: 1000,
    messages: [],
    logs: []
  },

  // --- 3. FINALIZANDO - DENTRO DO PRAZO ---
  { 
    id: 'fi-d-1', 
    flightNumber: 'RG-1003', 
    departureFlightNumber: 'RG-1004',
    airline: 'GOL', 
    airlineCode: 'RG', 
    model: 'B737-800',
    registration: 'PR-GGF',
    origin: 'SBSP', 
    destination: 'SBGL', 
    eta: '08:30', 
    etd: '14:18', 
    positionId: '202', 
    fuelStatus: 95, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Ricardo',
    fleet: '2140',
    vehicleType: 'SERVIDOR',
    volume: 8000,
    designationTime: new Date(new Date().getTime() - 90 * 60000),
    startTime: new Date(new Date().getTime() - 80 * 60000),
    maxFlowRate: 1200,
    currentFlowRate: 350,
    messages: [],
    logs: []
  },
  { 
    id: 'fi-d-2', 
    flightNumber: 'LA-2003', 
    departureFlightNumber: 'LA-2004',
    airline: 'LATAM', 
    airlineCode: 'LA', 
    model: 'A321',
    registration: 'PT-MXQ',
    origin: 'SBGR', 
    destination: 'SBKP', 
    eta: '08:20', 
    etd: '14:15',
    positionId: '204', 
    fuelStatus: 98, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Horácio',
    fleet: '2122',
    vehicleType: 'SERVIDOR',
    volume: 5500,
    designationTime: new Date(new Date().getTime() - 50 * 60000),
    startTime: new Date(new Date().getTime() - 40 * 60000),
    maxFlowRate: 1100,
    currentFlowRate: 250,
    messages: [],
    logs: []
  },

  // --- 4. FINALIZANDO - ATRASADO ---
  { 
    id: 'fi-a-1', 
    flightNumber: 'TP-3001', 
    departureFlightNumber: 'TP-3002',
    airline: 'TAP', 
    airlineCode: 'TP', 
    model: 'A330-900', 
    registration: 'CS-TUK',
    origin: 'LPPT', 
    destination: 'LPPT', 
    eta: '03:30', 
    etd: '05:05', // Atrasado
    positionId: '301', 
    fuelStatus: 99, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Gabriel',
    fleet: '2145',
    vehicleType: 'SERVIDOR', 
    volume: 40000,
    designationTime: new Date(new Date().getTime() - 120 * 60000),
    startTime: new Date(new Date().getTime() - 110 * 60000),
    maxFlowRate: 2400,
    currentFlowRate: 150,
    messages: [],
    logs: []
  },
  { 
    id: 'fi-a-2', 
    flightNumber: 'CM-0400', 
    departureFlightNumber: 'CM-0401',
    airline: 'COPA', 
    airlineCode: 'CM', 
    model: 'B737-800',
    registration: 'HP-1822',
    origin: 'MPTO', 
    destination: 'MPTO', 
    eta: '03:45', 
    etd: '04:55', // Atrasado
    positionId: '210', 
    fuelStatus: 97, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Rodrigo',
    fleet: '2123',
    vehicleType: 'SERVIDOR',
    volume: 12000,
    designationTime: new Date(new Date().getTime() - 80 * 60000),
    startTime: new Date(new Date().getTime() - 70 * 60000),
    maxFlowRate: 1200,
    currentFlowRate: 200,
    messages: [],
    logs: []
  },

  // --- 5. PAUSADO - DENTRO DO PRAZO ---
  { 
    id: 'pa-d-1', 
    flightNumber: 'LH-4001', 
    departureFlightNumber: 'LH-4002',
    airline: 'LUFTHANSA', 
    airlineCode: 'LH', 
    model: 'B747-8',
    registration: 'D-ABYC',
    origin: 'EDDF', 
    destination: 'EDDF', 
    eta: '08:00', 
    etd: '15:45',
    positionId: '302', 
    fuelStatus: 50, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Felipe',
    fleet: '2161',
    vehicleType: 'SERVIDOR', 
    volume: 110000,
    designationTime: new Date(new Date().getTime() - 40 * 60000),
    startTime: new Date(new Date().getTime() - 30 * 60000),
    maxFlowRate: 2800,
    currentFlowRate: 0, // PAUSADO
    messages: [],
    logs: [
        createLog(5, 'OBSERVACAO', 'Abastecimento pausado para troca de tripulação.', 'Felipe'),
    ]
  },
  { 
    id: 'pa-d-2', 
    flightNumber: 'AF-0454', 
    departureFlightNumber: 'AF-0455',
    airline: 'AIR FRANCE', 
    airlineCode: 'AF', 
    model: 'A350-900',
    registration: 'F-HTYA',
    origin: 'LFPG', 
    destination: 'LFPG', 
    eta: '08:10', 
    etd: '15:30',
    positionId: '305', 
    fuelStatus: 45, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Marcelo',
    fleet: '2164',
    vehicleType: 'SERVIDOR',
    volume: 85000,
    designationTime: new Date(new Date().getTime() - 35 * 60000),
    startTime: new Date(new Date().getTime() - 25 * 60000),
    maxFlowRate: 2400,
    currentFlowRate: 0, // PAUSADO
    messages: [],
    logs: [
        createLog(2, 'OBSERVACAO', 'Pausado por solicitação da manutenção.', 'Marcelo'),
    ]
  },

  // --- 6. PAUSADO - ATRASADO ---
  { 
    id: 'pa-a-1', 
    flightNumber: 'RG-2024', 
    departureFlightNumber: 'RG-2025',
    airline: 'GOL', 
    airlineCode: 'RG', 
    model: 'B737-800',
    registration: 'PR-GXP',
    origin: 'SBSP', 
    destination: 'SBCF', 
    eta: '03:45', 
    etd: '04:50', // Atrasado
    positionId: '212', 
    fuelStatus: 80, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Roberto',
    fleet: '2126',
    vehicleType: 'SERVIDOR',
    volume: 5000,
    designationTime: new Date(new Date().getTime() - 100 * 60000),
    startTime: new Date(new Date().getTime() - 90 * 60000),
    maxFlowRate: 1100,
    currentFlowRate: 0, // PAUSADO
    messages: [],
    logs: [
        createLog(5, 'ALERTA', 'Abastecimento interrompido em voo atrasado.', 'SISTEMA'),
    ]
  },
  { 
    id: 'pa-a-2', 
    flightNumber: 'AZ-0675', 
    departureFlightNumber: 'AZ-0676',
    airline: 'ITA', 
    airlineCode: 'AZ', 
    model: 'A350-900', 
    registration: 'EI-IFA',
    origin: 'LIRF', 
    destination: 'LIRF', 
    eta: '03:00', 
    etd: '04:40', // Atrasado
    positionId: '308', 
    fuelStatus: 75, 
    status: FlightStatus.ABASTECENDO,
    operator: 'Mariana',
    fleet: '2127',
    vehicleType: 'SERVIDOR', 
    volume: 60000,
    designationTime: new Date(new Date().getTime() - 150 * 60000),
    startTime: new Date(new Date().getTime() - 140 * 60000),
    maxFlowRate: 2400,
    currentFlowRate: 0, // PAUSADO
    messages: [],
    logs: []
  },
  { 
    id: '8', 
    flightNumber: 'AZ-0675', 
    departureFlightNumber: 'AZ-0676',
    airline: 'ITA', 
    airlineCode: 'AZ', 
    model: 'A350-900', 
    registration: 'EI-IFA',
    origin: 'LIRF', 
    destination: 'LIRF', 
    eta: '05:05', 
    etd: '06:25',
    positionId: '308', 
    fuelStatus: 20, 
    status: FlightStatus.CHEGADA,
    operator: undefined,
    fleet: undefined,
    vehicleType: 'SERVIDOR', 
    volume: 0,
    isOnGround: false,
    messages: [],
    logs: []
  },
];

// === CONFIGURAÇÃO DAS SUAS IMAGENS LOCAIS ===
// Mapeamento direto das imagens fornecidas para os operadores
// SALVE AS IMAGENS NA PASTA /public/avatars/ COM OS NOMES ABAIXO
const USER_DEFINED_AVATARS: Record<string, string> = {
    'Horácio': 'face_1.png',  // Homem negro, dreads
    'Carlos': 'face_2.png',   // Homem branco, polo azul
    'Bruno': 'face_3.png',    // Homem mais velho, barba grisalha
    'Felipe': 'face_4.png',   // Homem, camisa amarela
    'André': 'face_5.png',    // Homem, sweater verde
    'Gabriel': 'face_6.png',  // Homem negro, polo azul
    'Rodrigo': 'face_7.png',  // Homem branco, barba loira
    'Marcelo': 'face_8.png',  // Homem asiático, jaqueta verde
    'Sérgio': 'face_9.png',   // Homem mais velho, Henley azul
    'Ricardo': 'face_10.png', // Homem negro, careca
    'Betão': 'face_11.png',   // Homem branco, Henley branco
    'Tiago': 'face_12.png',   // Homem, sweater amarelo
    'Lucas': 'face_13.png',   // Homem, jaqueta jeans
    'Eduardo': 'face_14.png', // Homem asiático, sweater verde
    'Roberto': 'face_15.png', // Homem, camiseta azul
    'Mariana': 'face_16.png', // Homem negro, tranças (usando img 16 do set)
};

// Função para buscar a imagem local
const getAvatarPath = (warName: string) => {
    const filename = USER_DEFINED_AVATARS[warName];
    if (filename) {
        return `/avatars/${filename}`; // Caminho absoluto para a pasta public/avatars
    }
    return ''; // Retorna vazio se não encontrar, o componente usará o ícone padrão
};

// Gerador de perfis usando as imagens locais
const createProfile = (id: string, name: string, warName: string, category: 'AERODROMO' | 'VIP' | 'ILHA', status: any, shift: any): OperatorProfile => {
    // Determine fleet capability based on category
    let fleetCapability: 'CTA' | 'SRV' | 'BOTH' = 'BOTH';
    if (category === 'VIP') fleetCapability = 'CTA';
    if (category === 'ILHA') fleetCapability = 'CTA';
    if (category === 'AERODROMO') fleetCapability = Math.random() > 0.3 ? 'SRV' : 'BOTH';

    // Random last flight end time within last 2 hours
    const lastFlightEnd = new Date(Date.now() - Math.floor(Math.random() * 120) * 60000);

    return {
        id, fullName: name, warName, companyId: `FUNC-${Math.floor(Math.random()*9000)+1000}`, gruId: '237293', vestNumber: '0000', 
        
        // AQUI ESTÁ A MUDANÇA: Usando a função que busca seu arquivo local
        photoUrl: getAvatarPath(warName), 
        
        status, category, lastPosition: 'SBGR',
        shift: { cycle: shift, start: '06:00', end: '14:00' }, airlines: ['LATAM'], ratings: { speed: 5, safety: 5, airlineSpecific: {} }, expertise: { servidor: 95, cta: 60 },
        stats: { flightsWeekly: 42, flightsMonthly: 180, volumeWeekly: 650000, volumeMonthly: 2800000 },
        fleetCapability,
        lastFlightEnd
    };
};

export const MOCK_TEAM_PROFILES: OperatorProfile[] = [
    createProfile('op_horacio', 'Anderson Horácio Pires', 'Horácio', 'AERODROMO', 'OCUPADO', 'MANHÃ'),
    createProfile('op_carlos', 'Carlos Eduardo Mendes', 'Carlos', 'AERODROMO', 'OCUPADO', 'MANHÃ'),
    createProfile('op_bruno', 'Bruno Rodrigues Alves', 'Bruno', 'AERODROMO', 'OCUPADO', 'MANHÃ'),
    createProfile('op_felipe', 'Felipe Costa', 'Felipe', 'AERODROMO', 'DISPONÍVEL', 'MANHÃ'),
    createProfile('op_andre', 'André Santos', 'André', 'AERODROMO', 'OCUPADO', 'MANHÃ'),
    createProfile('op_gabriel', 'Gabriel Lima', 'Gabriel', 'AERODROMO', 'OCUPADO', 'TARDE'),
    createProfile('op_rodrigo', 'Rodrigo Silva', 'Rodrigo', 'AERODROMO', 'OCUPADO', 'TARDE'),
    createProfile('op_marcelo', 'Marcelo Souza', 'Marcelo', 'AERODROMO', 'DISPONÍVEL', 'TARDE'),
    createProfile('op_sergio', 'Sérgio Oliveira', 'Sérgio', 'AERODROMO', 'DISPONÍVEL', 'NOITE'),
    createProfile('op_ricardo', 'Ricardo Gomes', 'Ricardo', 'AERODROMO', 'OCUPADO', 'NOITE'),
    createProfile('op_betao', 'Roberto da Silva', 'Betão', 'ILHA', 'ENCHIMENTO', 'MANHÃ'),
    createProfile('op_tiago', 'Tiago Nunes', 'Tiago', 'ILHA', 'ENCHIMENTO', 'TARDE'),
    createProfile('op_lucas', 'Lucas Ferreira', 'Lucas', 'ILHA', 'DISPONÍVEL', 'NOITE'),
    createProfile('op_eduardo', 'Eduardo Martins', 'Eduardo', 'VIP', 'OCUPADO', 'MANHÃ'),
    createProfile('op_roberto', 'Roberto Carlos', 'Roberto', 'VIP', 'DISPONÍVEL', 'TARDE'),
    createProfile('op_mariana', 'Mariana Dias', 'Mariana', 'VIP', 'OCUPADO', 'NOITE'),
];
