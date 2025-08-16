import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ImportCsvModalProps {
	onClose: () => void
	onImport?: (file: File) => Promise<void> | void
}

export const ImportCsvModal = ({ onClose, onImport }: ImportCsvModalProps) => {
	const [file, setFile] = useState<File | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string>("")
  const { t } = useLanguage()

	const handleImport = async () => {
		if (!file) {
			setError(t('csv.chooseFileError'))
			return
		}
		setError("")
		try {
			setLoading(true)
			await onImport?.(file)
			onClose()
		} catch (e) {
			console.error("CSV import error:", e)
			setError(t('csv.importError'))
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
				<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('csv.title')}</h3>
				<div className="space-y-3">
					<input
						type="file"
						accept=".csv"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
						className="block w-full text-sm text-gray-700 dark:text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 dark:file:bg-gray-700 dark:file:text-gray-200 dark:hover:file:bg-gray-600"
					/>
					{error && <p className="text-sm text-red-600">{error}</p>}
				</div>
				<div className="mt-6 grid grid-cols-2 gap-2">
					<Button variant="outline" onClick={onClose}>{t('csv.cancel')}</Button>
					<Button onClick={handleImport} disabled={loading}>{loading ? t('csv.importing') : t('csv.import')}</Button>
				</div>
				<p className="mt-3 text-xs text-gray-500 dark:text-gray-400">{t('csv.supportedCols')}</p>
			</div>
		</div>
	)
}
