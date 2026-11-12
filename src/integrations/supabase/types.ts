export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      addenda: {
        Row: {
          author_id: string
          clinic_id: string
          content: string
          created_at: string
          encounter_id: string
          id: string
          reason: string
        }
        Insert: {
          author_id?: string
          clinic_id: string
          content: string
          created_at?: string
          encounter_id: string
          id?: string
          reason: string
        }
        Update: {
          author_id?: string
          clinic_id?: string
          content?: string
          created_at?: string
          encounter_id?: string
          id?: string
          reason?: string
        }
        Relationships: [
          {
            foreignKeyName: "addenda_clinic_id_encounter_id_fkey"
            columns: ["clinic_id", "encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["clinic_id", "id"]
          },
          {
            foreignKeyName: "addenda_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          admin_note: string
          clinic_id: string
          created_at: string
          ends_at: string
          expected_cents: number | null
          id: string
          is_block: boolean
          modality: string
          patient_id: string | null
          professional_id: string
          service: string
          starts_at: string
          status: string
        }
        Insert: {
          admin_note?: string
          clinic_id: string
          created_at?: string
          ends_at: string
          expected_cents?: number | null
          id?: string
          is_block?: boolean
          modality: string
          patient_id?: string | null
          professional_id: string
          service: string
          starts_at: string
          status?: string
        }
        Update: {
          admin_note?: string
          clinic_id?: string
          created_at?: string
          ends_at?: string
          expected_cents?: number | null
          id?: string
          is_block?: boolean
          modality?: string
          patient_id?: string | null
          professional_id?: string
          service?: string
          starts_at?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_clinic_id_patient_id_fkey"
            columns: ["clinic_id", "patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["clinic_id", "id"]
          },
        ]
      }
      audit_events: {
        Row: {
          actor: string | null
          clinic_id: string
          entity_id: string | null
          event: string
          id: string
          metadata: Json
          occurred_at: string
        }
        Insert: {
          actor?: string | null
          clinic_id: string
          entity_id?: string | null
          event: string
          id?: string
          metadata?: Json
          occurred_at?: string
        }
        Update: {
          actor?: string | null
          clinic_id?: string
          entity_id?: string | null
          event?: string
          id?: string
          metadata?: Json
          occurred_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_events_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      clinical_attachments: {
        Row: {
          author_id: string
          clinic_id: string
          created_at: string
          encounter_id: string | null
          filename: string
          id: string
          patient_id: string
          storage_path: string
        }
        Insert: {
          author_id?: string
          clinic_id: string
          created_at?: string
          encounter_id?: string | null
          filename: string
          id?: string
          patient_id: string
          storage_path: string
        }
        Update: {
          author_id?: string
          clinic_id?: string
          created_at?: string
          encounter_id?: string | null
          filename?: string
          id?: string
          patient_id?: string
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "clinical_attachments_clinic_id_encounter_id_fkey"
            columns: ["clinic_id", "encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["clinic_id", "id"]
          },
          {
            foreignKeyName: "clinical_attachments_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "clinical_attachments_clinic_id_patient_id_fkey"
            columns: ["clinic_id", "patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["clinic_id", "id"]
          },
        ]
      }
      clinics: {
        Row: {
          address: string | null
          contact: string | null
          crm: string | null
          id: string
          is_demo: boolean
          name: string
          professional_name: string | null
          retention_policy: string
          rqe: string | null
        }
        Insert: {
          address?: string | null
          contact?: string | null
          crm?: string | null
          id?: string
          is_demo?: boolean
          name?: string
          professional_name?: string | null
          retention_policy?: string
          rqe?: string | null
        }
        Update: {
          address?: string | null
          contact?: string | null
          crm?: string | null
          id?: string
          is_demo?: boolean
          name?: string
          professional_name?: string | null
          retention_policy?: string
          rqe?: string | null
        }
        Relationships: []
      }
      documents: {
        Row: {
          author_id: string
          clinic_id: string
          content: string
          created_at: string
          id: string
          kind: string
          patient_id: string
          status: string
          storage_path: string | null
        }
        Insert: {
          author_id?: string
          clinic_id: string
          content: string
          created_at?: string
          id?: string
          kind: string
          patient_id: string
          status?: string
          storage_path?: string | null
        }
        Update: {
          author_id?: string
          clinic_id?: string
          content?: string
          created_at?: string
          id?: string
          kind?: string
          patient_id?: string
          status?: string
          storage_path?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_clinic_id_patient_id_fkey"
            columns: ["clinic_id", "patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["clinic_id", "id"]
          },
        ]
      }
      encounter_versions: {
        Row: {
          author_id: string
          clinic_id: string
          content: Json
          created_at: string
          encounter_id: string
          id: string
          version: number
        }
        Insert: {
          author_id: string
          clinic_id: string
          content: Json
          created_at?: string
          encounter_id: string
          id?: string
          version: number
        }
        Update: {
          author_id?: string
          clinic_id?: string
          content?: Json
          created_at?: string
          encounter_id?: string
          id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "encounter_versions_clinic_id_encounter_id_fkey"
            columns: ["clinic_id", "encounter_id"]
            isOneToOne: false
            referencedRelation: "encounters"
            referencedColumns: ["clinic_id", "id"]
          },
          {
            foreignKeyName: "encounter_versions_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      encounters: {
        Row: {
          appointment_id: string | null
          author_id: string
          clinic_id: string
          content: Json
          created_at: string
          finalized_at: string | null
          id: string
          modality: string
          patient_id: string
          status: string
          updated_at: string
          version: number
        }
        Insert: {
          appointment_id?: string | null
          author_id?: string
          clinic_id: string
          content?: Json
          created_at?: string
          finalized_at?: string | null
          id?: string
          modality?: string
          patient_id: string
          status?: string
          updated_at?: string
          version?: number
        }
        Update: {
          appointment_id?: string | null
          author_id?: string
          clinic_id?: string
          content?: Json
          created_at?: string
          finalized_at?: string | null
          id?: string
          modality?: string
          patient_id?: string
          status?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "encounters_clinic_id_appointment_id_fkey"
            columns: ["clinic_id", "appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["clinic_id", "id"]
          },
          {
            foreignKeyName: "encounters_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "encounters_clinic_id_patient_id_fkey"
            columns: ["clinic_id", "patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["clinic_id", "id"]
          },
        ]
      }
      financial_titles: {
        Row: {
          amount_cents: number
          appointment_id: string | null
          cancelled: boolean
          category: string
          clinic_id: string
          created_at: string
          description: string
          direction: string
          due_date: string
          id: string
          patient_id: string | null
        }
        Insert: {
          amount_cents: number
          appointment_id?: string | null
          cancelled?: boolean
          category: string
          clinic_id: string
          created_at?: string
          description: string
          direction: string
          due_date: string
          id?: string
          patient_id?: string | null
        }
        Update: {
          amount_cents?: number
          appointment_id?: string | null
          cancelled?: boolean
          category?: string
          clinic_id?: string
          created_at?: string
          description?: string
          direction?: string
          due_date?: string
          id?: string
          patient_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "financial_titles_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "financial_titles_clinic_id_patient_id_fkey"
            columns: ["clinic_id", "patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["clinic_id", "id"]
          },
        ]
      }
      patients: {
        Row: {
          active: boolean
          address: string | null
          birth_date: string
          clinic_id: string
          created_at: string
          email: string | null
          guardian: string | null
          id: string
          identifier: string
          name: string
          phone: string | null
        }
        Insert: {
          active?: boolean
          address?: string | null
          birth_date: string
          clinic_id: string
          created_at?: string
          email?: string | null
          guardian?: string | null
          id?: string
          identifier?: string
          name: string
          phone?: string | null
        }
        Update: {
          active?: boolean
          address?: string | null
          birth_date?: string
          clinic_id?: string
          created_at?: string
          email?: string | null
          guardian?: string | null
          id?: string
          identifier?: string
          name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string
          id: string
        }
        Insert: {
          created_at?: string
          display_name?: string
          id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
        }
        Relationships: []
      }
      reversals: {
        Row: {
          amount_cents: number
          clinic_id: string
          created_at: string
          id: string
          reason: string
          reversed_at: string
          settlement_id: string
        }
        Insert: {
          amount_cents: number
          clinic_id: string
          created_at?: string
          id?: string
          reason: string
          reversed_at: string
          settlement_id: string
        }
        Update: {
          amount_cents?: number
          clinic_id?: string
          created_at?: string
          id?: string
          reason?: string
          reversed_at?: string
          settlement_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reversals_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reversals_clinic_id_settlement_id_fkey"
            columns: ["clinic_id", "settlement_id"]
            isOneToOne: false
            referencedRelation: "settlements"
            referencedColumns: ["clinic_id", "id"]
          },
        ]
      }
      services: {
        Row: {
          clinic_id: string
          duration_minutes: number
          id: string
          name: string
          price_cents: number | null
        }
        Insert: {
          clinic_id: string
          duration_minutes: number
          id?: string
          name: string
          price_cents?: number | null
        }
        Update: {
          clinic_id?: string
          duration_minutes?: number
          id?: string
          name?: string
          price_cents?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "services_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
      settlements: {
        Row: {
          amount_cents: number
          clinic_id: string
          created_at: string
          id: string
          method: string
          paid_at: string
          title_id: string
        }
        Insert: {
          amount_cents: number
          clinic_id: string
          created_at?: string
          id?: string
          method: string
          paid_at: string
          title_id: string
        }
        Update: {
          amount_cents?: number
          clinic_id?: string
          created_at?: string
          id?: string
          method?: string
          paid_at?: string
          title_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "settlements_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "settlements_clinic_id_title_id_fkey"
            columns: ["clinic_id", "title_id"]
            isOneToOne: false
            referencedRelation: "financial_titles"
            referencedColumns: ["clinic_id", "id"]
          },
        ]
      }
      user_roles: {
        Row: {
          clinic_id: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          clinic_id: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          clinic_id?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_clinic_id_fkey"
            columns: ["clinic_id"]
            isOneToOne: false
            referencedRelation: "clinics"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      audited_file_read: { Args: { path: string }; Returns: boolean }
      clinic_doctors: {
        Args: { c: string }
        Returns: {
          display_name: string
          user_id: string
        }[]
      }
      clinical_read: {
        Args: { c: string; entity: string; mode: string }
        Returns: Json
      }
      has_clinic_role: {
        Args: { c: string; medical?: boolean }
        Returns: boolean
      }
      record_access: {
        Args: { action: string; c: string; entity: string }
        Returns: undefined
      }
      save_clinical: {
        Args: {
          body: Json
          c: string
          entity: string
          expected: number
          finalize?: boolean
        }
        Returns: Json
      }
    }
    Enums: {
      app_role: "doctor" | "reception"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["doctor", "reception"],
    },
  },
} as const
