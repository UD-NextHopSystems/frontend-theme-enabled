export class Telemetry  {
	node_id_str          :string
	subscription_id_str:   string
	encoding_path        :string
	collection_id        :Number
	collection_start_time :Number
	msg_timestamp        :Number
	collection_end_time   :Number
}
export class CPUProcessCPUPIPELINEEDIT  {
	process_cpufifteenminute :Number
	processcpufiveminute    :Number
	processcpuoneminute     :Number
	processid               :Number
	processname             :string
}

export class CPUContent  {
	processcpupipelineedit : CPUProcessCPUPIPELINEEDIT[]
	totalcpufifteenminute  :Number
	totalcpufiveminute     :Number
	totalcpuoneminute      :Number
}

export class CPUKey  {
	nodename :string
}

export class CPURow  {
	timestamp :Number
	keys      :CPUKey
	content   :CPUContent
}

export class CPUTelemetryData  {
	Source    :string
	telemetry :Telemetry
	rows      :CPURow[]
}

export class GenericCountersKey  {
	interfacename :string
}

export class GenericCountersContent  {
	applique                       :Number
	availabilityflag               :Number
	broadcastpacketsreceived       :Number
	broadcastpacketsSent           :Number
	bytesreceived                  :Number
	bytessent                      :Number
	carriertransitions             :Number
	crcerrors                      :Number
	framingerrorsreceived          :Number
	giantpacketsreceived           :Number
	inputaborts                    :Number
	inputdrops                     :Number
	inputerrors                    :Number
	inputignoredpackets            :Number
	inputoverruns                  :Number
	inputqueuedrops                :Number
	lastdatatime                   :Number
	lastdiscontinuitytime          :Number
	multicastpacketsreceived       :Number
	multicastpacketssent           :Number
	outputbufferfailures           :Number
	outputbuffersswappedout        :Number
	outputdrops                    :Number
	outputerrors                   :Number
	outputqueuedrops               :Number
	outputunderruns                :Number
	packetsreceived                :Number
	packetssent                    :Number
	paritypacketsreceived          :Number
	resets                         :Number
	runtpacketsreceived            :Number
	secondssincelastclearcounters  :Number
	secondssincepacketreceived     :Number
	secondssincepacketSent         :Number
	throttledpacketsreceived       :Number
	unknownprotocolpacketsreceived :Number
}

export class GenericCountersRow  {
	timestamp :Number
	keys      :GenericCountersKey
	content   :GenericCountersContent
}

export class GenericCountersTelemetryData  {
	source    :string
	telemetry :Telemetry
	rows      :GenericCountersRow[]
}

export class DType  {
	source    :string
	telemetry :Telemetry
}
